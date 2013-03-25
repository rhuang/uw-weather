var lineChartData = {
	labels : ["10am","11am","12pm","1pm","2pm"],
	datasets : [
		{
			fillColor : "rgba(151,187,205,0.5)",
			strokeColor : "rgba(151,187,205,1)",
			pointColor : "rgba(151,187,205,1)",
			pointStrokeColor : "#fff",
			data : [28,24,23,25,31,21,19]
		}
	]
};

var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData);
