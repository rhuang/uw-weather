google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);

function drawChart() {

    jQuery.get("/apis/weather",function(data){

        var weatherData = data.response.data.Week.result;
        
        var graphData = new google.visualization.DataTable();
        graphData.addColumn('string','Day');
        graphData.addColumn('number', 'Temp');
        graphData.addRows(weatherData.length);

        for(var i = 0 ; i < weatherData.length; i++){
            var high = parseInt(weatherData[i].High);
            var low = parseInt(weatherData[i].Low);
            var average = (high + low) / 2;

            graphData.setValue(i, 0 , weatherData[i].Day);
            graphData.setValue(i, 1 , average);
        }

        var options = {
            title : 'Weather',
            hAxis : { title: 'Time Intervals' },
            animation : { duration : 1000, easing : 'out' }
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(graphData, options);
    });
}