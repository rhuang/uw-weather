
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);

var Chart = function (chart,data,options) {

    // singleton 
    if ( arguments.callee._chartInstance )
        return arguments.callee._chartInstance;

    arguments.callee._chartInstance = this;

    this.chart = chart;
    this.options = options;
    this.data = data;
};

function drawChart() {

  jQuery.get("/apis/weather",function(weatherData){

    var weeklyWeatherData = weatherData.response.data.Week.result;
    var graphData = [];
    var highest = 0 ;
    var lowest = 0;
    for(var i = 0 ; i < weeklyWeatherData.length; i++){
        var high = parseInt(weeklyWeatherData[i].High);
        var low = parseInt(weeklyWeatherData[i].Low);
        var average = (high + low) / 2;
        graphData.push(average);
        highest = average>highest ? average : highest;
        lowest = average < lowest  ? average : lowest;
    }

    var parentContainerWidth = $("#chart_div").width();
    var option = {
                width:parentContainerWidth, height:400,
                animation: {duration: 2000, easing: 'inAndOut'},
                vAxis: { baselineColor: 'none',textStyle : {color : "#FFFFFF", fontSize: 15,fontFamily : "Open sans"},gridlines: {color: '#FFFFFF', count: 5}, title: "Average Temperature",titleTextStyle: {color: '#FFFFFF', fontSize: 20}, minValue:highest, maxValue:lowest},
                backgroundColor:{
                    color: 'none',
                    fill: 'none'
                },
                areaOpacity : 0.8,
                series: {
                    0:{ color: '#ffffff', lineWidth: 4, pointSize: 10}
                },
                tooltipTextStyle: { color: '#444444', fontName: 'Open sans', fontSize: 12},
                fontName: 'Arial',
                colors: ["white"],
                legend: 'none',
                hAxis: {title: '',textStyle : {color : "#FFFFFF", fontSize: 15,fontFamily : "Open sans"},titleTextStyle: {color: '#FFFFFF', fontSize: 20,fontFamily : "Open sans"}}
            };

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Day');
    data.addColumn('number', 'Temp');

    for(var j = 0 ; j < weeklyWeatherData.length; j++){
    data.addRow([weeklyWeatherData[j].Day, 0]);
    }

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, option);

    var dataSize = graphData.length;
    for(var k = 0 ; k < dataSize; k++) {
        data.setValue(k,1,graphData[k]);
    }

    new Chart(chart,data,option);
    chart.draw(data, option);
    
  });

}

Chart.prototype.getChart = function () {
    return this.chart;
};

Chart.prototype.getOptions = function () {
    return this.options;
};

Chart.prototype.getData = function () {
    return this.data;
};

function resizeChart() {

    var chartObject = Chart();
    var chartImage = chartObject.getChart();
    var option = chartObject.getOptions();
    var data = chartObject.getData();
    var parentContainerWidth = $("#chart_div").width();
    option['width'] = parentContainerWidth;
    chartImage.draw(data, option);
};

window.onresize = resizeChart;