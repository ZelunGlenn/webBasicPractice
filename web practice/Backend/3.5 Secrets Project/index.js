//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming


import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 3000

const checkPassword = (req, res, next) => {
  if (req.body["password"] === "ILoveProgramming") req.checkP = true
  next()
}

app.use(express.static('public'))
app.use(express.urlencoded( {extended: true} ))
app.use(checkPassword)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.post('/check', (req, res) => {
  if (req.checkP) res.sendFile(path.join(__dirname, 'public', 'secret.html'))
  else {
    // pop up window and then redirect
    res.send(`
      <script>
        alert("Wrong password")
        window.location.href = "/"
      </script>
    `)
  }
})


app.listen(port, () => {
  console.log(`server listening on ${port}\nlink: http://localhost:${port}`)
})