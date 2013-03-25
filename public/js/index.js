window.WeatherModel = Backbone.Model.extend({
	urlRoot : "",
	defaults : {
		"Date" : "",
		"Day" : "",
		"AsOf" : "",
		"Condition" : "",
		"Icon" : "",
		"Temp" : "",
		"Humidity" : "",
		"WindChill" : "",
		"Max" : "",
		"Min" : "",
		"Wind" : "",
		"WindDr" : "",
		"Precipitation" : "",
		"Radiation" : "",
		"High" : "",
		"Low" : ""
	}
});

window.WeatherCollection = Backbone.Collection.extend({
	Model : WeatherModel,
	URL : ""
});



var appRouter = Backbone.Router.extend({
	routes: {
		"" : "displayWeather"
	},

	displayWeather : function(){
		//alert("hello");
	}
});


var app = new appRouter();

Backbone.history.start();

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
}
var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData);