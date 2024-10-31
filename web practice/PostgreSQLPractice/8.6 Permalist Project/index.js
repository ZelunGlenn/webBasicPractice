import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import pg from "pg";

const app = express();
const port = 3000;
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const password = process.env.PASSWORD;

const db = new pg.Client({
  user: 'postgres',
  password: password,
  host: 'localhost',
  port: 5432,
  database: 'permalist'
})

db.connect()

let items;

const getItems = async () => {
  const result = await db.query("SELECT * FROM items")
  items = result.rows
}

const deleteItems = async (id) => {
  await db.query("DELETE FROM items WHERE id = $1", [id])
}

const updateItems = async (id, title) => {
  await db.query("UPDATE items SET title = $2 WHERE id = $1", [id, title])
}

const addItems = async (title) => {
  await db.query("INSERT INTO items (title) VALUES ($1)", [title])
}

app.get("/", async (req, res) => {
  await getItems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  await addItems(item)
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  // updatedItemId
  // updatedItemTitle
  const updatedItemId = parseInt(req.body.updatedItemId)
  const updatedItemTitle = req.body.updatedItemTitle
  await updateItems(updatedItemId, updatedItemTitle)
  res.redirect("/");
});

app.post("/delete", async(req, res) => {
  // req.body.deleteItemId
  await deleteItems(req.body.deleteItemId)
  res.redirect("/")
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
