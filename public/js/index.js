
window.WeatherModel = Backbone.Model.extend({
	urlRoot : "apis/weather",
	defaults : {
		"date" 			: null,
		"day"  			: null,
		"asOf" 			: null,
		"condition" 	: null,
		"icon" 			: null,
		"temp" 			: null,
		"humidity" 		: null,
		"windchill" 	: null,
		"max" 			: null,
		"min" 			: null,
		"wind" 			: null,
		"winddirection" : null,
		"precipitation" : null,
		"radiation" 	: null,
		"high" 			: null,
		"low" 			: null
	}

	/*

	parse : function() {
		WeatherModel wm = new WeatherModel({
			date: reponse.date,
			day: response.current.day
		});
		return wm;
	}
	*/
});

window.ForecastModel = Backbone.Model.extend({
	urlRoot:"apis/weather",
	defaults : {
		"Condition" : null,
		"Image" 	: null,
		"High" 		: null,
		"Low" 		: null  
	}
});

window.WeatherCollection = Backbone.Collection.extend({
	model : ForecastModel,
	url : "apis/weather",

	parse: function(response){
		return response.response.data.Week.result;
	}
});


window.WeatherView = Backbone.Collection.extend({

   // template:_.template($('#').html()),

    initialize:function () {
    },

    render:function (eventName) {
    } 
});

window.GraphView = Backbone.Collection.extend({

    //template:_.template($('#').html()),

    initialize:function () {
    },

    render:function (eventName) {
    } 
});


window.ForecastItemView = Backbone.Collection.extend({

    template:_.template($('#forecast-template').html()),

    initialize:function () {
    },

    render:function (element) {
    	var model = this.models[0].attributes.model;
        $(element).html(this.template(model.toJSON()));
        return element;
    },

    close:function(){
    	$(element).remove();
    }
});

window.ForecastView = Backbone.Collection.extend({

    initialize:function () {
    },

    render:function (element) {

    	var model = this.models[0].attributes.model;
    	
        _.each(model.models, function (forecast) {
        	//alert(element);
        	var fitem  = new ForecastItemView({model:forecast}).render("li");
        	//alert(fitem);
            element += fitem;
            //alert(element);
        }, this);
        return element;
    },

    close:function(){
    	$(element).empty();
    }
});


var appRouter = Backbone.Router.extend({
	routes: {
		"" : "displayWeather"
	},

	displayWeather : function(){
		var forecast = new WeatherCollection();
		var forecastView = new ForecastView({model: forecast});

		forecast.fetch(
			{ success: function(){
				$('#forecast').html(forecastView.render(''));
			}
		});

		
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
