var ctx = document.getElementById('myChart').getContext('2d');
var ctx2 = document.getElementById('myChart2').getContext('2d');

var cores = [ '#33FF33', '#996600', '#993300', '#0099CC', '#FF0000', '#FF6600', '#FFCC00', '#CCFFFF', '#33CC99', '#99CC99'];

console.log(cores)
// ************************ gráfico1 ************************
const opcoes =  {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
            text: `Valor Gasto com cada serviço de Cloud (Total de $ ${valorTotal} dólares)`
        },
        padding: 50
    }
}

const data = {
    labels: rotulos,
    datasets: [{
        data: valores,
        backgroundColor: cores,
        hoverOffset: 4
    }],
};

var myChart = new Chart(ctx, {
type: 'doughnut',
data: data,
options: opcoes,
});
// ************************ ############## ************************
// ************************ gráfico2 ************************

const data2 = {
    labels: rotulos,
    datasets: [{
        data: usage,
        backgroundColor: cores,
        hoverOffset: 4
    }],
};


const opcoes2 =  {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'Ocorrências de uso dos serviços'
        }
    }
}

var myChart2 = new Chart(ctx2, {
    type: 'doughnut',
    data: data2,
    options: opcoes2,
    });
// ************************ ############## ************************
// ************************ gráfico2 ************************