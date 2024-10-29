import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
const port = 3000;
dotenv.config();

const password = process.env.PASSWORD

const { Pool } = pg;
const pool = new Pool({
  user: 'postgres',
  password: password,
  host: 'localhost',
  port: 5432,
  database: 'world'
})

const getVisitedCountries = async () => {
  let visited_countries = '',
    total_visited_countries = 0
  //Write your code here.
  try {
    const countries = await pool.query('SELECT * FROM visited_countries')
    visited_countries = countries.rows.map(row => row.country_code).join(',')
    total_visited_countries = countries.rows.length
    return {
      visited_countries: visited_countries,
      total_visited_countries: total_visited_countries
    }
  } catch (e) {
    console.error(e)
    throw e
  }
}

const getCountryCode = async(country) => {
  try {
    const raw = await pool.query(`SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'`, [country])
    const country_code = raw.rows[0].country_code
    return country_code
  } catch (err) {
    console.error(err)
    throw err
  }
}


const addVisitedCountries = async(country_code) => {
  try {
    await pool.query('INSERT INTO visited_countries (country_code) VALUES ($1)', [country_code])
    // log
    console.log(`Added ${country_code} to visited_countries`)
  } catch (err) {
    console.error(err)
    throw err
  }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {

  //Write your code here.
  try {
    const { visited_countries, total_visited_countries } = await getVisitedCountries()
    console.log(`Visited ${visited_countries} countries`)
    res.render('index.ejs', {
      total: total_visited_countries,
      countries: visited_countries,
    })
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
});

app.post('/add', async (req, res) => {
  // console.log(req.body)
  const country = req.body.country.charAt(0).toUpperCase() + req.body.country.slice(1)
  try {
    const country_code = await getCountryCode(country)
    await addVisitedCountries(country_code)
    res.redirect('/')
  } catch (err) {
    const { visited_countries, total_visited_countries } = await getVisitedCountries()
    console.error(err.message)
    if (err.message.includes('duplicate key')) {
      res.render('index.ejs', { error: 'Country already visited',
        total: total_visited_countries,
        countries: visited_countries,
       })
    } else {
      res.render('index.ejs', { error: 'Country name is not founded',
        total: total_visited_countries,
        countries: visited_countries,
       })
    }
  }
})


process.on('SIGTERM', async () => {
  try {
    await pool.end();
    console.log('Pool has ended');
  } catch (err) {
    console.error('Error closing pool', err);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
