const main_views = require("../views/main_views");
const fs = require("fs"); //filesystem
const getimages = require("../modules/getimages");
const download = require('image-downloader');
const bodyParser = require("body-parser");
const imageservice = require("../services/image_service");
const { json } = require("body-parser");



const downloadImage = (req, res, next) => {
    // Download to a directory and save with an another filename
    let form = req.body;
    console.log(form); //lomakkeella kenttien name-tagi on se joka välittyy parametrina

    let enari = req.body.enarilomakkeelta;
    console.log(enari, "päläpälä");
    options = {
        url: "https://public.keskofiles.com/f/k-ruoka/product/"+enari,
        dest: "/Users/johannapakkala/"+enari+".png"      // will be saved to /path/to/dest/photo.jpg
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
    if (imagesearchoptions.eanlist && imagesearchoptions.source) {
        imageservice.getImages(imagesearchoptions.source, imagesearchoptions.eanlist).then(resolvedImages => {
            res.send(JSON.stringify(resolvedImages));
        }); //then jää odottamaan vastausta
    }

}


module.exports.get_main = get_main;
module.exports.downloadImage = downloadImage;
module.exports.get_images = get_images;


