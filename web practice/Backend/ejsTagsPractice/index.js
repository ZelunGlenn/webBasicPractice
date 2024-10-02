import express from "express";

const app = express();

app.get('/', (req, res) => {
  const data = {
    name: "Glenn",
    time: new Date().getDate(),
    items: ["apple", "banana", "orange"],
    htmlContent: "<em>This is some em.</em>",
  }

  res.render('index.ejs', data)
})

app.listen(3000, ()=> {
  console.log("Server is running on port 3000 \nhttp://localhost:3000");
})