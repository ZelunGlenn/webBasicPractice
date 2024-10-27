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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  try {
    const { visited_countries, total_visited_countries } = await getVisitedCountries()
    res.render('index.ejs', {
      total: total_visited_countries,
      countries: visited_countries,
    })
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
});

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
