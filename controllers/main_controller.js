const main_views = require("../views/main_views");
const fs = require("fs"); //filesystem
const getimages = require("../modules/getimages");
const download = require('image-downloader');
const bodyParser = require("body-parser");
const imageservice = require("../services/image_service");
const { json } = require("body-parser");


// TULEE TÄÄLTÄ: app.post('/lataa', main_controller.downloadImage);
const downloadImage = (req, res, next) => {
    // Download to a directory and save with an another filename
    let form = req.body;
    console.log(form); //lomakkeella kenttien name-tagi on se joka välittyy parametrina

    let enari = req.body.enarilomakkeelta; // tähän tulee enarit myös alaviivan kans (tammer)
    console.log(enari, "= main_controller/downloadImageen (KESKO) välittynyt ean-koodi");
    options = {
        url: "https://public.keskofiles.com/f/k-ruoka/product/" + enari,
        dest: "/Users/johannapakkala/" + enari + ".png"      // will be saved to /path/to/dest/photo.jpg
        // dest: `/Users/johannapakkala/12345677.png`      // will be saved to /path/to/dest/photo.jpg
        // HUOMAA ERILAISET HIPSUT, MIKÄLI KÄYTÄT MUUTTUJAA DOLLARILLA
    }

    download.image(options)
        .then(({ filename }) => {
            console.log('Saved to', filename)  // saved to /path/to/dest/photo.jpg
            // res.redirect("/"); // returns user back to root
            res.send();
        })
        .catch((err) => console.error(err))
};
const downloadImageTammer = (req, res, next) => {
    // Download to a directory and save with an another filename
    let form = req.body;
    console.log(form); //lomakkeella kenttien name-tagi on se joka välittyy parametrina

    // jaetaan ean ja url kahdeksi muuttujaksi
    var index = req.body.enarilomakkeelta.indexOf(",");  // Gets the first index where a space occurs
    var enari = req.body.enarilomakkeelta.substr(0, index); // Gets the first part
    var latausurli = req.body.enarilomakkeelta.substr(index + 1);  // Gets the text part
    

    // let enari = req.body.enarilomakkeelta; // tähän tulee enarit myös alaviivan kans (tammer)
    // let latausurli = req.body.urlilomakkeelta; // nämä kaks riviä välittyi main.html:stä download-funktiosta

    console.log(enari, "= main_controller/downloadImageen (TAMMER) välittynyt ean-koodi");
    console.log(latausurli, "Kuvan URL")

    options = {
        url: latausurli,
        dest: "/Users/johannapakkala/Dropbox/nettikuvat/" + enari + ".jpg"      // will be saved to /path/to/dest/photo.jpg
        // dest: `/Users/johannapakkala/12345677.png`      // will be saved to /path/to/dest/photo.jpg
        // HUOMAA ERILAISET HIPSUT, MIKÄLI KÄYTÄT MUUTTUJAA DOLLARILLA
    }

    download.image(options)
        .then(({ filename }) => {
            console.log('Saved to', filename)  // saved to /path/to/dest/photo.jpg
            // res.redirect("/"); // returns user back to root
            res.send();
        })
        .catch((err) => console.error(err))
};


const get_main = (req, res, next) => {
    //ALOITUSSIVU

    // let dataaMainViewsiin = {
    //     html: fs.readFileSync("./views/main.html").toString("utf-8")
    // }

    // res.send(main_views.main_view(dataaMainViewsiin));

    let html = fs.readFileSync("./views/main.html").toString("utf-8");
    res.send(html);
};

const get_images = (req, res) => {
    let imagesearchoptions = req.body; // täältä tulee JSON-objekti joka on post-kutsulla lähetetty
    console.log(imagesearchoptions);
    console.log("= ylempänä näkyy imagesearchoptions main_controllerissa");
    if (imagesearchoptions.eanlist && imagesearchoptions.source) {
        imageservice.getImages(imagesearchoptions.source, imagesearchoptions.eanlist).then(resolvedImages => {
            res.send(JSON.stringify(resolvedImages));
        }); //then jää odottamaan vastausta
    }

}


module.exports.get_main = get_main;
module.exports.downloadImage = downloadImage;
module.exports.downloadImageTammer = downloadImageTammer;
module.exports.get_images = get_images;


