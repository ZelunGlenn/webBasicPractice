const fs = require('fs')

// fs.writeFile('message.txt', 'Hello, worlds!', (err) => {
//   if (err) return
//   console.log('File is already written!')
// })

fs.readFile('message.txt', "utf-8", (err, data) => {
  if (err) return
  console.log(data)
})