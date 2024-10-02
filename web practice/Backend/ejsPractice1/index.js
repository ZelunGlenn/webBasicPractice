import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  const d = new Date()
  req.day = d.getDay()
  res.render(
    "outputText.ejs", 
    {
      day: req.day,
    }
  )
})

app.listen(port, () => {
  console.log(`Server is running on port ${port} \nhttp://localhost:${port}`)
})