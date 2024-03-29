
const https = require("https"); //noden valmis kirjasto
const querystring = require('querystring');
const HTMLParser = require('node-html-parser');
const { getTammerUrl } = require("../modules/getimages");

const tammerOptions = {
    hostname: 'tammerbrands24h.fi',
    port: 443,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Host': 'www.tammerbrands24h.fi'
    }
}

//tämä parsettaa tiedon tammerin sivulta ja lähettää sen resolvella kutsujalle
function makeTammerRequest(ean) {
    let postData = querystring.stringify({'q': ean});
    return new Promise((resolve, reject) => {
        let opts = JSON.parse(JSON.stringify(tammerOptions));
        opts.path = "/fi/kirjautuminen";
        opts.body = postData;
        opts.headers['Content-Length'] = postData.length;
        let req = https.request(opts, res => {
            let data = [];
            res.on("data", d => {
                data.push(d);
            });
            res.on("close", () => {
                let root = HTMLParser.parse(data.join(""));
                console.log(root);
                let description = root.querySelector("p").innerText;
                let title = root.querySelector("h2").innerText;
                let imageForms = root.querySelectorAll("form").slice(1);
                let productnumber = ean.substr(6,6); // tammerin tuotenumero
                let productnumberimage = "";

                if (productnumber.substr(0,1) == "0") {// mikäli tuotenumeron eka nro on nolla..
                    productnumber = productnumber.substr(1,5); }// ..poistaa sen
                let urls = [];
                if (title == "Hyvä Tammer Brands asiakas,") // jos haulla ei tullu mitään
                {
                    title = "Ei löydy ean-koodilla, haetaan tuotenumerolla: " + productnumber;
                    description = "";
                    productnumberimage = getTammerUrl(ean);
                }
                else {
                    for (let imageForm of imageForms) { // jos haulla tuli tuloksia, hakee kaikki, myös lisäkuvat
                        let attr = imageForm.getAttribute("action");
                        urls.push(`tammerbrands24h.fi/${attr}`);
                    }
                }

                // PALAUTTAA KUTSUJALLE (makeimagerequest.then) OBJEKTIN
                resolve({
                    images: urls,
                    description: description,
                    title: title,
                    ean: ean,
                    productnumber: productnumber,
                    productnumberimage: productnumberimage,
                });
                resolve(data.join(""));
            });
            //console.log(res);
        });
        req.on("error", (e) => {
            reject(e); // VÄLITTÄÄ VIRHEEN KUTSUJALLE
            console.error(e);
        });
        req.write(postData);
        req.end();
    });
}

// await ja async kulkee aina parina
function getImages(source, eanlist) {
    return new Promise(async resolve => {
        let products = [];
        for (let ean of eanlist) {
            if (source == "tammertukku") { // source main.html:ssä requestObj:ssa
                let p = await makeTammerRequest(ean);
                products.push(p);
            }
            else if (source == "kesko") {
                let p = await makeKeskoRequest(ean);
                products.push(p);
            }
            else if (source == "minimani") {
                let p = await makeMinimaniRequest(ean);
                products.push(p);
            }
        }
        resolve(products);
    })
}


// module.exports.getImages = getImages;
exports.getImages = getImages;