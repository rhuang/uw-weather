
window.WeatherModel = Backbone.Model.extend({
    urlRoot : "apis/weather",
    defaults :{
	"date"		:null,
	"day"		:null,
	"asOf"		:null,
	"condition"	:null,
	"icon"		:null,
	"temp"		:null,
	"humidity"	:null,
	"windchill"	:null,
	"max"		:null,
	"min"		:null,
	"wind"		:null,
	"winddirection"	:null,
	"precipitation"	:null,
	"radiation"	:null,
	"high"		:null,
	"low"		:null
    },

    /*

      parse : function() {
      WeatherModel wm = new WeatherModel({
      date: reponse.date,
      day: response.current.day
      });
      return wm;
      }
    */

    parse : function(response){
	return response.response.data.Current;
    }
});

window.ForecastModel = Backbone.Model.extend({
    urlRoot:"apis/weather",
    defaults:{
	"condition"	:null,
	"image"		:null,
	"high"		:null,
	"low"		:null  
    }
});

window.WeatherCollection = Backbone.Collection.extend({
    model	:ForecastModel,
    url	:"apis/weather",

    parse:	function(response){
	return response.response.data.Week.result;
    }
});


window.ForecastItemView = Backbone.View.extend({
    template:_.template($('#forecast-template').html()),

    initialize:function () {
    },

    render:function () {
	this.el = this.template(this.model.toJSON());
	return this;
    },

    close:function(){
	this.$el.remove();
    }
});

window.ForecastView = Backbone.View.extend({

    initialize:function () {
    },

    render:function () {
    	this.el = "";
    	_.each(this.model.models, function (forecast) {
    		this.el += new ForecastItemView({model:forecast}).render().el;
    	}, this);
    	return this;
    },

    close:function(){
	this.$el.empty();
    }
});


window.GraphView = Backbone.View.extend({

    //template:_.template($('#').html()),

    initialize:function () {
    },

    render:function (eventName) {
    } 
});

window.WeatherView = Backbone.View.extend({

    template:_.template($('#weather-template').html()),

    initialize:function () {
    },

    render:function (eventName) {
	this.el = this.template(this.model.toJSON());
	return this;
    } 
});

window.WeatherDetailsView = Backbone.View.extend({

    template:_.template($('#weather-details-template').html()),

    initialize:function () {
    },

    render:function (eventName) {
	this.el = this.template(this.model.toJSON())
	return this;

    } 
});

var appRouter = Backbone.Router.extend({
    routes: {
	"" : "displayWeather"
    },

    displayWeather : function(){

	var weather 		= new WeatherModel();
	var forecast 		= new WeatherCollection();
	var weatherView 	= new WeatherView({model:weather});
	var weatherDetailsView 	= new WeatherDetailsView({model:weather});
	var forecastView 	= new ForecastView({model:forecast});


	forecast.fetch({ 
	    success: function(){
		$('#forecast').html(forecastView.render().el);
	    }
	});

	weather.fetch({
	    success: function(){
		$('#weather').html(weatherView.render().el);
		$('#weatherdetails').html(weatherDetailsView.render().el);
	    }
	})
    }
});

var app = new appRouter();

Backbone.history.start();
