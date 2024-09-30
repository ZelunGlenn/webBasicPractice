import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send("hello world!")
})

app.get('/about', (req, res) => {
  res.send(`<h1>About me</h1> <p>Hi, My name is Glenn</p>`)
})

app.get('/contact', (req, res) => {
  res.send('Contact me')
})

app.listen(port, () => {
  console.log(`port running on port: ${port}`)
})