const API_KEY = 'EE9PYLn8oYA-qxW3SQYq';

let startDate
let endDate
let firstStart = false;

async function loadCourseCurrently() {
    startDate = new Date().toISOString().split('T')[0]; //'2022-05-22'
    endDate = new Date().toISOString().split('T')[0];

    loadCourse();
    input2();
}

function input2() {
    document.getElementById('startDate').placeholder = "10.06.2022";
    document.getElementById('endDate').placeholder = "10.06.2022";
    console.log(startDate, endDate)
}

async function loadCourse() {
    // https://data.nasdaq.com/api/v3/datasets/BCHAIN/MKPRU?start_date='2022-05-22'&end_date='2022-05-22'&api_key=EE9PYLn8oYA-qxW3SQYq
    // let url = `https://data.nasdaq.com/api/v3/datasets/BITFINEX/LUNAF0USTF0?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;
    let url = `https://data.nasdaq.com/api/v3/datasets/BCHAIN/MKPRU?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;

    let response = await fetch(url);
    let responseAsJson = await response.json();
    let bitcoinDate = responseAsJson.dataset.data;

    if (!firstStart) { showBitcoinToday(bitcoinDate); };
    renderTable(bitcoinDate);
    dateCalculat(bitcoinDate);
    myChart();
    xValues = [];
    yValues = [];
}

function dateFormatDE(index){
    let options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    let date = new Date(index);
    date = date.toLocaleDateString('de-DE', options);
    return date;
}

function showBitcoinToday(bitcoinDate) {
    document.getElementById('showBitcoinToday').innerHTML = bitcoinDate[0][1];

    let date = dateFormatDE(bitcoinDate[0][0]);

    document.getElementById('showDateToday').innerHTML = date;
    firstStart = true;
}

function showCourse() {
    startDate = document.getElementById('startDate').value;
    endDate = document.getElementById('endDate').value;

    loadCourse();
    // myChart();
    // xValues = [];
    // yValues = [];
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

        let date = dateFormatDE(element[0]);

        table.innerHTML +=
            `
            <tr>
                <td>${date}</td>
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

        let date = dateFormatDE(element[0]);
        xValues.push(date);
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