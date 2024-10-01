import express from "express";

const app = express();
const port = 3000;

// Create a new middleware
const logger = (req, res, next) => {
  console.log(`req time: ${req.method} \nreq url: ${req.url} \nreq time: ${Date.UTC()}`);
  next()
}

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port} on http://localhost:${port}`);
});
