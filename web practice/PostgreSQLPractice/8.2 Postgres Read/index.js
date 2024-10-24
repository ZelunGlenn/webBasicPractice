import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";


const app = express();
const port = 3000;

dotenv.config();

const password = process.env.PASSWORD
const db = new pg.Client({
  user: 'postgres',
  password: password,
  host: 'localhost',
  port: 5432,
  database: 'world'
})

db.connect()

let quiz
const getFlags = async () => {
  try {
    const results = await db.query('SELECT * FROM flags')
    quiz = results.rows
  } catch (e) {
    console.log(e)
  } finally {
    db.end()
  }
}
getFlags()

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", (req, res) => {
  totalCorrect = 0;
  nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.name.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
