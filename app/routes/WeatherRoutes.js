/**
 * The route for the UW weather API located at http://api.uwaterloo.ca/#!/weather.
 */
var weatherService = require('./../models//Weather');

/**
 * @params {Object} req The request parameters.
 * @params {Object} res The response object to send the data.
 */
exports.weather = function(req, res) {
    weatherService.get(req, res, function(data) {
        res.send(data);
    });
}
