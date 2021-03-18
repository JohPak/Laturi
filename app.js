// node app.js käynnistää serverin
//
// Käynnistä serveri komenolla npm run start
// Kehitystyön aikana voidaan serveri käynnistää myös komennolla npm run start-dev, jolloin serveri käynnistyy automaattisesti uudestaan, kun tiedostoihin tulee muutoksia
//
// CTRL + C pysäyttää serverin

const bodyParser = require('body-parser');
const express = require('express')
const fs = require("fs"); //filesystem
const app = express()
const port = 8080

//CONTROLLERS
const main_controller = require("./controllers/main_controller")

// STATIC FILES under public-folder
// Anything you put in the /public folder can now be requested by your browser and displayed. HTML, images, almost anything. So for example, if you put an image called “my_image.png” inside the public folder, you can access it using your browser by going to http://localhost:8080/my_image.png. Of course Express has many many more features, but you can look those up as you continue developing
// app.use(express.static(__dirname + '/public'));

//__difname on paikka jossa olen kun käynnistän serverin
app.use(express.static(__dirname));
app.use(bodyParser.json()); //osaa lukea jsonista bodyn
app.use(bodyParser.urlencoded({ extended: true })); //osaa lukea url-enkoodattuja juttuja

app.get('/', main_controller.get_main);
app.post('/lataa', main_controller.downloadImage);
app.post('/lataatammer', main_controller.downloadImageTammer);
app.post('/get', main_controller.get_images);

// kaikki kuvat vois tallentaa palvelimelle yhteen kansioon ja ladata kerralla
// Download a file from NodeJS Server using Express
// /Users/johannapakkala/Projects/Kuvalataaja/Laturi/upload-folder/dramaticpenguin.MOV
app.get('/download', function(req, res){
  // const file = `${__dirname}/upload-folder/dramaticpenguin.MOV`;
  const file = `${__dirname}/controllers/upload-folder/`;
  res.download(file); // Set disposition and send it.
});

// app.get('/', (req, res) => {
//     // Ohjataan juureen tuleva liikenne näyttämään main.html-tiedostoa
//     // res.sendFile(__dirname+"/views/main.html");
//     let data = fs.readFileSync("./views/main.html").toString("utf-8");
//     res.send(data);
// })



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})