//https://www.tammerbrands24h.fi/images/products/30/3/303624.jpg?
// 641041 30 3 624 6

const baseurl = "https://www.tammerbrands24h.fi/images/products/";
const keskourl = "https://public.keskofiles.com/f/k-ruoka/product/";
const download = require('image-downloader');

let eans = [];
let url_2 = [];
let url_1 = [];
let url_6 = [];
let fullurls = [];
let finals;

console.log(baseurl);

function get_tammer() {

    // tyhjätään loota, jos ei oo jo tyhjä
    if (finals != "") {
        document.getElementById("urlit").innerHTML = "";
        finals = "";
    }
    
   
        // haetaan textareasta kaikki rivit ja jaetaan ne arrayhyn
        eans = document.getElementById("eanlist").value.split('\n');
        
        //talletetaan enarin lopusta 6. ja 7. merkit urlia varten
        for (let index = 0; index < this.eans.length; index++) {
            if (this.eans[index].charAt(this.eans[index].length-7) == "0") {
                url_2[index] = this.eans[index].charAt(this.eans[index].length-6) + this.eans[index].charAt(this.eans[index].length-5);
                fullurls[index] = baseurl + url_2[index];
            }
            else {
                url_2[index] = this.eans[index].charAt(this.eans[index].length-7) + this.eans[index].charAt(this.eans[index].length-6);
                fullurls[index] = baseurl + url_2[index];
            }
        }
        //talletetaan enarin lopusta 5. merkki urlia varten
        for (let index = 0; index < this.eans.length; index++) {
            if (this.eans[index].charAt(this.eans[index].length-7) == "0") {
                url_1[index] = this.eans[index].charAt(this.eans[index].length-4)
                fullurls[index] += "/" + url_1[index];
            }
            else {
                url_1[index] = this.eans[index].charAt(this.eans[index].length-5)
                fullurls[index] += "/" + url_1[index];
            }

        }
        //talletetaan enarin lopusta 6 toiseksi vipaa merkkiä urlia varten
        for (let index = 0; index < this.eans.length; index++) {
            // jos tuotenron eka numero on nolla, jätetään se pois
            if (this.eans[index].charAt(this.eans[index].length-7) == "0") {
                url_6[index] =
                this.eans[index].charAt(this.eans[index].length-6) +
                this.eans[index].charAt(this.eans[index].length-5) +
                this.eans[index].charAt(this.eans[index].length-4) +
                this.eans[index].charAt(this.eans[index].length-3) +
                this.eans[index].charAt(this.eans[index].length-2);    
                fullurls[index] += "/" + url_6[index] + ".jpg";
            }
            else {
                
                url_6[index] =
                this.eans[index].charAt(this.eans[index].length-7) +
                this.eans[index].charAt(this.eans[index].length-6) +
                this.eans[index].charAt(this.eans[index].length-5) +
                this.eans[index].charAt(this.eans[index].length-4) +
                this.eans[index].charAt(this.eans[index].length-3) +
                this.eans[index].charAt(this.eans[index].length-2);
                fullurls[index] += "/" + url_6[index] + ".jpg";
            }
        }
        
        // muodostetaan a href-linkki
        for (let index = 0; index < fullurls.length; index++) {
            this.finals += "<br><img src=\"" + fullurls[index] + "\" download=" + this.eans[index] + ".jpg> ";
            this.finals += "<a href=\"" + fullurls[index] + "\">" + fullurls[index] + "</a>";
        }
        
        document.getElementById("urlit").innerHTML = this.finals;
        return this.finals;
        
        
    }

function get_kesko() {
        // tyhjätään loota, jos ei oo jo tyhjä
        if (this.finals != "") {
            document.getElementById("urlit").innerHTML = "";
            this.finals = "";
        }

         // haetaan textareasta kaikki rivit ja jaetaan ne arrayhyn
         this.eans = document.getElementById("eanlist").value.split('\n');

        // muodostetaan a href-linkki
        for (let index = 0; index < this.eans.length; index++) {
            this.finals += "<br><a href=\""+ keskourl + this.eans[index]+"\" download=\""+ this.eans[index] +".png\">"+"<img src=\"" + keskourl + this.eans[index] + "\" crossorigin=\"anonymous\" download=\""+ this.eans[index] +".png\"> ";

            // this.finals += "<br><img src=\"" + keskourl + this.eans[index] + "\" crossorigin=\"anonymous\"> ";
            // this.finals += "<a href=\"" + keskourl + this.eans[index] + "\">" + this.eans[index] + "</a>";
            
            //ladataan koneelle
            const options = {
                url: this.eans[index],
                dest: '/Users/johannapakkala/'      // will be saved to /path/to/dest/image.jpg
            }
            
            download.image(options)
            .then(({ filename }) => {
                console.log('Saved to', filename)   // saved to /path/to/dest/image.jpg
            })
            .catch((err) => console.error(err))
        }
        
        document.getElementById("urlit").innerHTML = this.finals;
        return this.finals;
}

module.exports.get_tammer = get_tammer;
module.exports.get_kesko = get_kesko;



/*
6410413036246
6410412756718
6410411020735
6410412756695
6410413287396
6410416039190
6410410102043
6410411020421
6410411020452
6410412745248
6410413287273

6409100078249
6408430408412
6408430408450
6408430408405
6412000081202
6407830039172
8714100773482
6407810014175
6411200108504
8718114829661
*/