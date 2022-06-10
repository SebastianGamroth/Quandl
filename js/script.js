const API_KEY = 'EE9PYLn8oYA-qxW3SQYq';
let startDate
let endDate
let firstStart = false;

async function loadCourseCurrently() {
    startDate = new Date().toISOString().split('T')[0]; //'2022-05-22'
    endDate = new Date().toISOString().split('T')[0];
    loadCourse();
}

async function loadCourse() {
    // let url = `https://data.nasdaq.com/api/v3/datasets/BITFINEX/LUNAF0USTF0?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;
    let url = `https://data.nasdaq.com/api/v3/datasets/BCHAIN/MKPRU?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    // let bitcoinDate = responseAsJson.dataset.data[0];
    let bitcoinDate = responseAsJson.dataset.data;


    if (!firstStart) { showBitcoinToday(bitcoinDate); };
    renderTable(bitcoinDate);
    // console.log(responseAsJson);
    dateCalculat(bitcoinDate);
    myChart();
}

function showBitcoinToday(bitcoinDate) {
    document.getElementById('showBitcoinToday').innerHTML = bitcoinDate[0][1];

    let date = bitcoinDate[0][0];
    console.log(date);
    // console.log(date.toLocaleDateString('de-DE'));

    document.getElementById('showDateToday').innerHTML = date;
    firstStart = true;
}

function showCourse() {
    startDate = document.getElementById('startDate');
    endDate = document.getElementById('endDate');
    startDate = startDate.value;
    endDate = endDate.value;

    loadCourse();
    // renderTable();
}

function renderTable(bitcoinDate) {
    let table = document.getElementById('tabelCourse');

    table.innerHTML = '';

    table.innerHTML +=
        `
            <tr>
                <th>Datum</th>
                <th>Preis</th>
            </tr>
        `;

    for (let i = 0; i < bitcoinDate.length; i++) {
        const element = bitcoinDate[i];
        table.innerHTML +=
            `
            <tr>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
            </tr>
        `;
    }
}

var xValues = [];
var yValues = [];

function dateCalculat(bitcoinDate) {
    for (let i = 0; i < bitcoinDate.length; i++) {
        const element = bitcoinDate[i];
        xValues.push(element[0]);
        yValues.push(element[1]);
    }
}

function myChart() {
    new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: yValues
            }]
        },
        options: {
            legend: { display: false },
            scales: {
                yAxes: [{ ticks: { min: 0, max: 50000 } }],
            }
        }
    });
}




// Beispiel Aktuelles Datum - ein Tag davor
let today = new Date();
today.setDate(new Date().getDate() - 1);
let startDateLastDay = today.toISOString().split('T')[0];