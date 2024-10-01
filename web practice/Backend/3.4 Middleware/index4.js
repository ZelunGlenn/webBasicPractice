import express from "express";
import path from "path";
const app = express();
const port = 3000;

var bandname = ""

const loder = (req, res, next) => {
  console.log(req.body)
  bandname = req.body["street"] + "    " + req.body["pet"]
  next()
}

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(loder)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.post('/submit', (req, res) => {
  res.send(`
    <h1>Wellcome to your band 🏳️‍🌈</h1>
    <p>${bandname} 🐼</p>
    <button onclick="window.history.back()">Back</button>
    `)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
