//jshint esversion:6

$(function () {
    $.get('/load/', function (data) {
        $('#currencyTags').autocomplete({
            source: data
        });
    });
});


//allRates is the button in the index.html
const allRates = document.querySelector("#allRates");
const requestRate = document.querySelector("#requestRate");
const currencyTags = document.querySelector('#currencyTags');
const selCurrency = document.querySelector("#selCurrency");
const output = document.querySelector('#output');
const output1 = document.querySelector('#output1');


//this will be the API
const url = "https://api.coinmarketcap.com/v1/ticker/";

const cur = ["BRL", "EUR", "GBP", "USD" ];


for (var i = 0; i < cur.length; i++) {
    var option = document.createElement('option'), txt = document.createTextNode(cur[i]);
    option.appendChild(txt);
    option.setAttribute('value', cur[i]);
    selCurrency.insertBefore(option, selCurrency.lastChild);
}


allRates.addEventListener('click', getAllRates);
requestRate.addEventListener('click', getOneRate);

//function for main value of BTC in HomePage

function getPesos() {
    let url = '/price/' + "ARS" ;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let pesulios = "$" + (Math.round(JSON.parse(data)[0].price_ars * 100) / 100);
        console.log(pesulios);
        document.querySelector(".valorEnPesos").innerHTML = pesulios;
    }).catch(function (error) {
        console.log(JSON.stringify(error));
    });

}
getPesos();

function getOneRate() {
    let curValue = currencyTags.value;
    let urlPlus = 'crypto/' + curValue;
    fetch(urlPlus).then(function (response) {
        return response.json();
    }).then(function (data) {
        outputOneCur(JSON.parse(data)[0]);
    }).catch(function (error) {
        console.log(JSON.stringify(error));
    });
    console.log(urlPlus);
}

function outputOneCur(data) {
    console.log(data);
    let html = '<h1 class="display-4">' + data.name + '</h1>';
    for (key in data) {
        let keyContent = key.replace("_", " ").capitalize();
        let val = data[key];
        html += '<div class="mb0 centerForms">' + keyContent + ' : ' + val + '</div>';
    }
    output1.innerHTML = html;
}

function getAllRates() {
    let curValue = selCurrency.value;
    let url = '/price/' + curValue;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        outputToPage(JSON.parse(data), curValue);
    }).catch(function (error) {
        console.log(JSON.stringify(error));
    });
}


function outputToPage(data, c) {
    output.innerHTML = '';
    let currencyLower = 'price_' + c.toLowerCase();
    data.forEach(function (item, i) {
        //name .price_usd symbol
        let priceFixed = (Math.round(item[currencyLower] * 100) / 100);
        let div = document.createElement('div');
        div.setAttribute('class', 'rates col-lg-3 col-md-4 col-sm-6');
        let list = document.createElement('li');
        let ul = document.createElement('ul');
        list.innerHTML = `${item.name} ${item.symbol}` + "<strong>" + ` ${priceFixed} ${c}` + '</strong>';
        ul.appendChild(list);
        div.appendChild(ul);
        output.appendChild(div);
        //console.log(item);
    });
}
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
