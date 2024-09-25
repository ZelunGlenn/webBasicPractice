import inquirer from "inquirer"
import qr from "qr-image"
import fs from "fs"

inquirer
  .prompt([
    {
      name: 'url',
      message: "Please enter a URL: "
    },
  ])
  .then ((answers) => {
    var qr_svg = qr.image(answers.url)
    qr_svg.pipe(fs.createWriteStream('qr_img.png'));
    fs.writeFile('images.txt', answers.url, (err) => {
      if (err) throw err
      console.log('image stored successfully')
    })
  })
  .catch((err) => {
    if (err.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
      console.error(err)
    }
  })