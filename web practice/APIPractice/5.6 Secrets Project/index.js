// HINTS:
// 1. Import express and axios
import express from 'express'
import axios from 'axios'

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', async (req, res) => {
  const rawData = await axios.get("https://secrets-api.appbrewery.com/random")
  console.log(JSON.stringify(rawData.data))
  res.render('index.ejs', {
    // remove " and " at the beginning and end of the JSON.stringify
    secret: JSON.stringify(rawData.data.secret).replace(/"/g, ""),
    user: JSON.stringify(rawData.data.username).replace(/"/g, "")
    
    
  })
})

app.listen(port, () => {
  console.log(`port running on https://localhost:${port}`)
})
// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
