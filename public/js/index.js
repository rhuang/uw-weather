

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
        var forecastType = getWeatherForecastType(this.model.attributes.Condition);
        var foreCastClass =  forecastType.forecastImageClassName;
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

window.WeatherDetailsView = Backbone.View.extend({

    template:_.template($('#weather-details-template').html()),

    initialize:function () {
    },

    render:function (eventName) {
	this.el = this.template(this.model.toJSON());

    var forecastType = getWeatherForecastType(this.model.attributes.Condition);
    var backgroundImageClassName =  forecastType.backgroundImageClassName;
    
    $("body").addClass(backgroundImageClassName);
    //onsole.log(backgroundImageClassName)
    //$("body").addClass("snow-image-background");

    switch(backgroundImageClassName){

        case FORECAST_TYPES.SUNNY.backgroundImageClassName :   $(".main-container").addClass(FORECAST_TYPES.SUNNY.overlayImageClassName); break;
        case FORECAST_TYPES.STORM.backgroundImageClassName :   $(".main-container").addClass(FORECAST_TYPES.STORM.overlayImageClassName); break;
        case FORECAST_TYPES.CLEAR.backgroundImageClassName :   $(".main-container").addClass(FORECAST_TYPES.CLEAR.overlayImageClassName); break;
        case FORECAST_TYPES.RAIN.backgroundImageClassName  :   $(".main-container").addClass(FORECAST_TYPES.RAIN.overlayImageClassName); break;
        case FORECAST_TYPES.SNOW.backgroundImageClassName  :   $(".main-container").addClass(FORECAST_TYPES.SNOW.overlayImageClassName); break;
        case FORECAST_TYPES.CLOUDY.backgroundImageClassName:   $(".main-container").addClass(FORECAST_TYPES.CLOUDY.overlayImageClassName); break;
    }

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

        var weatherDetailsView = new WeatherDetailsView({model:weather});
        var forecastView = new ForecastView({model:forecast});

        forecast.fetch({
            success: function(){
                forecastView.render();
            }
        });

        weather.fetch({
            success: function(){
                $('#weatherdetails').html(weatherDetailsView.render().el);
            }
        });
    }
});

var app = new appRouter();

Backbone.history.start();
