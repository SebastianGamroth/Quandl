const API_KEY = 'EE9PYLn8oYA-qxW3SQYq';

async function loadCourse() {
    let startDate = new Date().toISOString().split('T')[0]; //'2022-05-22'
    let endDate = new Date().toISOString().split('T')[0];
    // let url = `https://data.nasdaq.com/api/v3/datasets/BITFINEX/LUNAF0USTF0?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;
    let url = `https://data.nasdaq.com/api/v3/datasets/BCHAIN/MKPRU?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let bitcoinToday = responseAsJson.dataset.data[0];

    showBitcoinToday(bitcoinToday);
    console.log(responseAsJson);
    // console.log(dataset);
}

function showBitcoinToday(bitcoinToday) {

    document.getElementById('showBitcoinToday').innerHTML = bitcoinToday[1];
    document.getElementById('showDataToday').innerHTML = bitcoinToday[0];
}


// Beispiel Aktuelles Datum - ein Tag davor
let today = new Date();
today.setDate(new Date().getDate() - 1);
let startDateLastDay = today.toISOString().split('T')[0];