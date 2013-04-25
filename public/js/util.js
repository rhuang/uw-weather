/*
*	Utility functions
*/


/*needs to go into some global file/class */

var FORECAST_TYPES = {
  SUNNY                 : {forecastImageClassName: "sunny-image-forecast"				, backgroundImageClassName: "sunny-image-background"},
  STORM					: {forecastImageClassName: "storm-image-forecast"				, backgroundImageClassName: ""},
  CLEAR                 : {forecastImageClassName: "clear-image-forecast"				, backgroundImageClassName: "clear-image-background"},
  RAIN                  : {forecastImageClassName: "rain-image-forecast"				, backgroundImageClassName: "rainy-image-background"},
  SNOW					: {forecastImageClassName: "snow-image-forecast"				, backgroundImageClassName: "snow-image-background"},
  CLOUDY                : {forecastImageClassName: "cloudy-image-forecast"				, backgroundImageClassName: ""}
};

/*
*	Description -	Takes in a forecast condition and classifies different kinds of weather into the major categories
*					that are summarized in FORECAST_TYPES
*
*	Returns		-	The forecast type that can then be used to retrieve either forecastImageClassName or backgroundImagePath
*/
function getWeatherForecastType(forecast) {

	var forecastType;
	forecast = forecast.toLowerCase();
	
	if (forecast.indexOf("sunny") >= 0) {
		forecastType = FORECAST_TYPES.SUNNY;
	}

	if (forecast.indexOf("storm") >= 0) {
		forecastType = FORECAST_TYPES.CHANCE_OF_STORM;
	}

	if (forecast.indexOf("clear") >= 0) {
		forecastType =  FORECAST_TYPES.CLEAR;
	}

	if(forecast.indexOf("cloud") >= 0 || forecast.indexOf("fog") >= 0) {
		forecastType =  FORECAST_TYPES.CLOUDY;
	}

	if(forecast.indexOf("rain") >= 0 || forecast.indexOf("showers") >= 0 || forecast.indexOf("drizzle") >= 0) {
		forecastType = FORECAST_TYPES.RAIN;
	}

	if(forecast.indexOf("flurries") >= 0 || forecast.indexOf("snow") >= 0) {
		forecastType =  FORECAST_TYPES.SNOW;
	}

	return forecastType;
}