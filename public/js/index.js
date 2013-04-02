
/*needs to go into some global file/class ?*/

var FORECAST_TYPES = {
  SUNNY                 : {value: "Mostly sunny"        ,   className: "sunny-image-forecast"},
  CHANCE_OF_STORM       : {value: "Chance of storm"     ,   className: "chance-of-storm-image-forecast"},
  CLEAR                 : {value: "Clear"               ,   className: "clear-image-forecast"},
  RAIN                  : {value: "Rain"                ,   className: "rain-image-forecast"},
  CHANCE_OF_FLURRIES    : {value: "Chance of flurries"  ,   className: "chance-of-flurries-image-forecast"},
  CLOUDY                : {value: "Cloudy"              ,   className: "cloudy-image-forecast"}
};


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

    tagName : "section",
    className : "forecast-container span3",

    initialize:function () {
    },

    render:function () {
        this.$el.html(this.template(this.model.toJSON()));

        var foreCastClass = "";
        switch(this.model.attributes.Condition){
            case "Mostly sunny"         : foreCastClass = "sunny-image-forecast" ; break;
            case "Chance of storm"      : foreCastClass = "chance-of-storm-image-forecast" ; break;
            case "Clear"                : foreCastClass = "clear-image-forecast" ; break;
            case "Rain"                 : foreCastClass = "rain-image-forecast" ; break;
            case "Chance of flurries"   : foreCastClass = "chance-of-flurries-image-forecast" ; break;
            case "Cloudy"               : foreCastClass = "cloudy-image-forecast" ; break;
            default                     : foreCastClass = "sunny-image-forecast" ; /*not a great default, need image not found*/
        }


        this.el.querySelector('.weather-image').classList.add(foreCastClass);
        return this;
    },

    close:function(){
	this.$el.remove();
    }
});

window.ForecastView = Backbone.View.extend({

    el : '#forecast' ,

    initialize:function () {
    },

    render:function () {
        _.each(this.model.models, function (forecast) {
            this.$el.append(new ForecastItemView({model:forecast}).render().el) ;
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
	this.el = this.template(this.model.toJSON());
	return this;

    }
});

var appRouter = Backbone.Router.extend({
    routes: {
	"" : "displayWeather"
    },

    displayWeather : function(){

        var weather = new WeatherModel();
        var forecast = new WeatherCollection();
        var weatherView = new WeatherView({model:weather});
        var weatherDetailsView = new WeatherDetailsView({model:weather});
        var forecastView = new ForecastView({model:forecast});

        forecast.fetch({
            success: function(){

                forecastView.render();
            }
        });

        weather.fetch({
            success: function(){
                $('#weather').html(weatherView.render().el);
                $('#weatherdetails').html(weatherDetailsView.render().el);
            }
        });
    }
});

var app = new appRouter();

Backbone.history.start();
