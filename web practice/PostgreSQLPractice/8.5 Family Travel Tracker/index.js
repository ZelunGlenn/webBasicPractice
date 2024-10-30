import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
const port = 3000;
dotenv.config()
const password = process.env.PASSWORD;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: password,
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users;

async function checkVisisted(currentUserId) {
  const result = await db.query("SELECT countries.country_code FROM visited_countries JOIN countries ON countries.id = visited_countries.countries_id JOIN users ON users.id = visited_countries.user_id WHERE visited_countries.user_id = $1", [currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function getUsers() {
  const result = await db.query("SELECT * FROM users")
  users = result.rows;
}


app.get("/", async (req, res) => {
  await getUsers();
  const countries = await checkVisisted(currentUserId);
  const user = users.find(user => user.id === currentUserId)
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: user['color'],
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT id FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );
    const data = result.rows[0];
    const countryId = parseInt(data.id);
    try {
      await db.query(
        "INSERT INTO visited_countries (user_id, countries_id) VALUES ($1, $2)",
        [currentUserId, countryId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  if (req.body.user) {
    currentUserId = parseInt(req.body["user"]);
    res.redirect("/");
  } else {
    res.render('new.ejs')
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  // { name: 'Glenn', color: 'green' }
  const name = req.body.name;
  const color = req.body.color;

  try {
    const result = await db.query("INSERT INTO users (name, color) VALUES ($1, $2) RETURNING id, name, color;", [name, color]);
    console.log(result.rows[0])
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
