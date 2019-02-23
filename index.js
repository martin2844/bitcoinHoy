//jshint esversion:6
const express = require("express");
const app = express();
const url = "https://api.coinmarketcap.com/v1/ticker/";
//request allows the server to make http requests
const request = require("request");

const path = require('path');


app.use(express.static(path.join(__dirname, 'public')));

/* this route gets all of the IDs in the API and pushes them to an array,
so we get an array with all of the CRYPTOCURRENCY names.
We add the Capitalize function at the ID for neatness
*/
app.get("/load", (req,res)=>{
  request(url, (err,response,body)=> {
    let holder = [];
    let data = JSON.parse(body);
    for(var i = 0; i<data.length; i++){
      holder.push(data[i].id.capitalize());
    }
  res.json(holder);
});
});


//this route gets the international currency, if no one is specified it defaults USD
app.get('/price/:cur', function (req, res) {
    let curValue = (req.params.cur) ? req.params.cur : 'ARS';
    request(url + '?convert=' + curValue, function (error, rep, body) {
        res.json(body);
    });
});


//this route gets the crypto currency, if no one is specified it defaults BTC


app.get('/crypto/:cur', function (req, res) {
    console.log(req.params);
    let curValue = (req.params.cur) ? req.params.cur : 'Bitcoin';
    request(url + curValue + '/', function (error, rep, body) {
        res.json(body);
    });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Started on port 3000");
});

//prototype to capitalize
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
