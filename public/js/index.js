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

window.WeatherCollection = Backbone.Collection.extedn({
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