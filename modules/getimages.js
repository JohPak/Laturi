const getKesko = function (eanlist) {

    const keskourl = "https://public.keskofiles.com/f/k-ruoka/product/";
    let finals = "";

    for (let index = 0; index < eanlist.length; index++) {
        finals += "<div class=\"tuotekuvadiv\"><a href=\"" + keskourl + eanlist[index] + "\"><img src=\"" + keskourl + eanlist[index] + "\" class=\"tuotekuva\" title=\"" + keskourl + eanlist[index] + "\" download=\"" + eanlist[index] + "\"><p class=\"tuotekuvaean\">" + eanlist[index] + "<\/p><\/div>";
    }
    // console.log(finals);
    return finals;

}

const getTokmanni = function (eanlist) {

    const tokmanniurl = "https://res.cloudinary.com/tokmanni/image/upload/c_pad,b_white,f_auto,h_1200,w_1200/d_default.png/";
    let finals = "";

    for (let index = 0; index < eanlist.length; index++) {
        finals += "<div class=\"tuotekuvadiv\"><a href=\"" + tokmanniurl + eanlist[index] + ".png\"><img src=\"" + tokmanniurl + eanlist[index] + ".png\" class=\"tuotekuva\" title=\"" + tokmanniurl + eanlist[index] + ".png\" download=\"" + eanlist[index] + ".png\"><p class=\"tuotekuvaean\">" + eanlist[index] + ".png<\/p><\/div>";
    }
    // console.log(finals);
    return finals;

}

const getTammer = function (eanlist) {

    const tammerurl = "https://www.tammerbrands24h.fi/images/products/";
    let finals = "";
    let url_2 = [];
    let url_1 = [];
    let url_6 = []; // tammerin tuotenumero
    let fullurls = [];

    //talletetaan enarin lopusta 6. ja 7. merkit urlia varten
    for (let index = 0; index < eanlist.length; index++) {
        if (eanlist[index].charAt(eanlist[index].length - 7) == "0") {
            url_2[index] = eanlist[index].charAt(eanlist[index].length - 6) + eanlist[index].charAt(eanlist[index].length - 5);
            fullurls[index] = tammerurl + url_2[index];
        }
        else {
            url_2[index] = eanlist[index].charAt(eanlist[index].length - 7) + eanlist[index].charAt(eanlist[index].length - 6);
            fullurls[index] = tammerurl + url_2[index];
        }
    }
    //talletetaan enarin lopusta 5. merkki urlia varten
    for (let index = 0; index < eanlist.length; index++) {
        if (eanlist[index].charAt(eanlist[index].length - 7) == "0") {
            url_1[index] = eanlist[index].charAt(eanlist[index].length - 4)
            fullurls[index] += "/" + url_1[index];
        }
        else {
            url_1[index] = eanlist[index].charAt(eanlist[index].length - 5)
            fullurls[index] += "/" + url_1[index];
        }

    }
    //talletetaan enarin lopusta 6 toiseksi vipaa merkkiä urlia varten
    for (let index = 0; index < eanlist.length; index++) {
        // jos tuotenron eka numero on nolla, jätetään se pois
        if (eanlist[index].charAt(eanlist[index].length - 7) == "0") {
            url_6[index] =
                eanlist[index].charAt(eanlist[index].length - 6) +
                eanlist[index].charAt(eanlist[index].length - 5) +
                eanlist[index].charAt(eanlist[index].length - 4) +
                eanlist[index].charAt(eanlist[index].length - 3) +
                eanlist[index].charAt(eanlist[index].length - 2);
            fullurls[index] += "/" + url_6[index] + ".jpg";
        }
        else {

            url_6[index] =
                eanlist[index].charAt(eanlist[index].length - 7) +
                eanlist[index].charAt(eanlist[index].length - 6) +
                eanlist[index].charAt(eanlist[index].length - 5) +
                eanlist[index].charAt(eanlist[index].length - 4) +
                eanlist[index].charAt(eanlist[index].length - 3) +
                eanlist[index].charAt(eanlist[index].length - 2);
            fullurls[index] += "/" + url_6[index] + ".jpg";
        }
    }

    // muodostetaan a href-linkki
    for (let index = 0; index < fullurls.length; index++) {
        // finals += "<a href=\"" + fullurls[index] + "\" download=\"" + eanlist[index] + "\"><div class=\"tuotekuvadiv\"><img class=\"tuotekuva\" title=\"" + fullurls[index] + "\" src=\"" + fullurls[index] + "\" download=\"" + eanlist[index] + "\"><p class=\"tuotekuvaean\">" + eanlist[index] + "<\/p><\/div><\/a>";
        
        finals += `<a href="${fullurls[index]}" download="${eanlist[index]}"><div class="tuotekuvadiv"><img class="tuotekuva" title="${fullurls[index]}" src="${fullurls[index]}" download="${eanlist[index]}"><p class="tuotekuvaean">${eanlist[index]}</p></div></a>`;
    }

    return finals;

}

const getImages = function (req, cb) {
    let url = "/get";
    let x = new XMLHttpRequest();
    x.onreadystatechange = () => {
        if (x.readyState == 4) {
            cb(JSON.parse(x.responseText));
        }
    }
    x.open("POST", url, true);
    x.setRequestHeader("Content-Type", "application/json");
    x.send(JSON.stringify(req));
}

