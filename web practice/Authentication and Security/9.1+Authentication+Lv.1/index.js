import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
const port = 3000;
dotenv.config()

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Auth01',
  password: process.env.PASSWORD,
  port: 5432,
})

db.connect()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  // console.log(req.body.username)
  // console.log(req.body.password)
  const { username, password } = req.body;

  // check if username and password already exist
  const check = await db.query("SELECT * FROM users WHERE email = $1;", [username])

  if (check.rows.length > 0) {
    console.log("Username already exists")
    return res.redirect("/register")
  }
  const feedback = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;", [username, password])
  console.log(feedback)
  res.render("secrets.ejs");
});

app.post("/login", async (req, res) => {
  console.log(req.body.username)
  console.log(req.body.password)

  const { username, password } = req.body;
  const feedback = await db.query("SELECT * FROM users WHERE email = $1 AND password = $2;", [username, password])
  console.log(feedback)
  res.render("secrets.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
