
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


window.ForecastView = Backbone.Collection.extend({
	
    //template:_.template($('#').html()),

    initialize:function () {
    },

    render:function (eventName) {
      	$(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});


var appRouter = Backbone.Router.extend({
	routes: {
		"" : "displayWeather"
	},

	displayWeather : function(){
		var forecast = new WeatherCollection();
		this.ForecastView = new ForecastView({model:this.forecast});

		//forecast.fetch();
        //$('#').html(this.ForecastView.render().el);
	}
});

var app = new appRouter();

Backbone.history.start();
