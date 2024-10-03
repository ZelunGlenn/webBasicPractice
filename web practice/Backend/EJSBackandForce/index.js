import express from 'express'

const app = express()
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.post('/users', (req, res) => {
  req.count = req.body["name"].length + req.body["email"].length + req.body["phone"].length;
  res.render('index.ejs', 
    {number: req.count},
  )
})

app.listen(3000, () => {
  console.log('listening on port 3000 at http://localhost:3000')
})