const API_KEY = 'EE9PYLn8oYA-qxW3SQYq';

let startDate = '';
let endDate = '';
const productBitcoin = 0;
const productGold = 0;
let url;
let id;
let chartValuesX = [];
let chartValuesY = [];
let chartValuesMin;
let chartValuesMax;

async function changeDate() {
    startDate = document.getElementById('startDate').value;
    endDate = document.getElementById('endDate').value;

    document.getElementById('diagram1').classList.add('d-none');
    document.getElementById('diagram2').classList.add('d-none');
    document.getElementById('myChart').classList.remove('d-none');

    loadCourse();
}

function changeProductNum(num) {
    id = num;
}

function renderChangeProduct() {
    if (id == 0) {
        url = `https://data.nasdaq.com/api/v3/datasets/BCHAIN/MKPRU?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;
    }
    if (id == 1) {
        url = `https://data.nasdaq.com/api/v3/datasets/LBMA/GOLD?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;
    }
}

async function loadCourse() {
    renderChangeProduct();

    let response = await fetch(url);
    let responseAsJson = await response.json();
    let courseDateApi = responseAsJson.dataset.data;
    // console.log(responseAsJson)

    renderTable(courseDateApi);
    currencyChart(courseDateApi);
    dateChart(courseDateApi);
    myChart();
    chartValuesX = [];
    chartValuesY = [];
    textCourseUpdate();
    valueFieldColor();
}

function dateFormatDE(index) {
    let options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    let date = new Date(index);
    date = date.toLocaleDateString('de-DE', options);
    return date;
}

function textCourseUpdate() {
    let nameCourse;
    if (id == 0) { nameCourse = 'Bitcoin' };
    if (id == 1) { nameCourse = 'Gold' };
    document.getElementById('textCourseUpdate').innerHTML = `<nobr><b>${nameCourse}</b> Kurs <br>max. <b>${chartValuesMax} USD</b> <wbr>min. <b>${chartValuesMin} USD</b></nobr>`;
}

function renderTable(courseDateApi) {
    let table = document.getElementById('tabelCourse');
    table.innerHTML = '';

    table.innerHTML +=
        `
            <tr>
                <th>Datum</th>
                <th>Preis</th>
            </tr>
        `;

    for (let i = 0; i < courseDateApi.length; i++) {
        const element = courseDateApi[i];
        let date = dateFormatDE(element[0]);

        table.innerHTML +=
            `
            <tr>
                <td>${date}</td>
                <td id="valueFieldColor${element[1].toFixed(0)}">${element[1].toFixed(2)} USD</td>
            </tr>
        `;
    }
}

// 
function valueFieldColor() {
    document.getElementById('valueFieldColor' + (chartValuesMin + 1)).style.backgroundColor = '#ffbaba';
    document.getElementById('valueFieldColor' + (chartValuesMax - 1)).style.backgroundColor = '#bdbdff';
}

// ---------- myChart

function currencyChart(courseDateApi) {
    let index = [];
    for (let i = 0; i < courseDateApi.length; i++) {
        const element = courseDateApi[i];

        index.push(element[1].toFixed(0))
    }
    chartValuesMin = Math.min(...index) - 1;
    chartValuesMax = Math.max(...index) + 1;
}

function dateChart(courseDateApi) {
    for (let i = 0; i < courseDateApi.length; i++) {
        const element = courseDateApi[i];

        let date = dateFormatDE(element[0]);
        chartValuesX.push(date);
        chartValuesY.push(element[1]);
    }
}

function myChart() {
    new Chart("myChart", {
        type: "line",
        data: {
            labels: chartValuesX,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: chartValuesY
            }]
        },
        options: {
            legend: { display: false },
            scales: {
                yAxes: [{ ticks: { min: chartValuesMin, max: chartValuesMax } }],
            }
        }
    });
}

// ---------- navigation menu

function navBar() {
    document.getElementById('body').classList.toggle('overflow');

    document.getElementById('menu').classList.toggle('d-none');
    document.getElementById('barImg').classList.toggle('barImg');

    document.getElementById('pageLaws').classList.toggle('d-none');
    toggleRegulations('imprint', 'privacy', 'copyright');
}

function backNavBar() {
    document.getElementById('menu').classList.toggle('d-none');
    document.getElementById('barImg').classList.toggle('barImg');
}

function back() {
    document.getElementById('body').classList.toggle('overflow');
    document.getElementById('pageLaws').classList.toggle('d-none');
    document.getElementById('backNavBar').classList.add('d-none');
    document.getElementById('back').classList.add('d-none');
    toggleRegulations('imprint', 'privacy', 'copyright');
}

// ---------- jump window top

function arrowUp() {
    window.scrollTo(0, 0);
}

window.onscroll = function () {
    let scroll = Math.trunc(window.scrollY);

    if (scroll < 120) {
        document.getElementById('arrowUp').style.display = 'none';
    }
    if (scroll > 120) {
        document.getElementById('arrowUp').style.display = 'flex';;
    }
}

// ---------- page Laws

function imprint() {
    regulationShow('imprint');
    toggleRegulations('privacy', 'copyright');
}

function privacy() {
    regulationShow('privacy');
    toggleRegulations('imprint', 'copyright');
}

function copyright() {
    regulationShow('copyright');
    toggleRegulations('imprint', 'privacy');
}

function regulationShow(index) {
    window.scrollTo(0, 0);
    document.getElementById(index).classList.remove('d-none');
    hideMenu();
}

function toggleRegulations(first, second, third) {
    document.getElementById(first).classList.add('d-none');
    document.getElementById(second).classList.add('d-none');
    if (third == 'copyright') { document.getElementById(third).classList.add('d-none'); }
}

function hideMenu() {
    document.getElementById('back').classList.remove('d-none');
    document.getElementById('backNavBar').classList.remove('d-none');
    document.getElementById('menu').classList.toggle('d-none');
    document.getElementById('barImg').classList.toggle('barImg');
}