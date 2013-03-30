/**
 * Routes for the weather API.
 */
var WeatherModel = require(__dirname + '/../models/weather');

/**
 * The route for the UW weather API located at http://api.uwaterloo.ca/#!/weather.
 *
 * @param {Express} app The Express server that will render the routes.
 */
WeatherRoute = function(app) {
    app.get('/apis/weather', function(req, res) {
        new WeatherModel().get(req, res, function(data) {
            res.send(data);
        });
    });
};

module.exports = WeatherRoute;

