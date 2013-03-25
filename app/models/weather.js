/**
 * Service for retrieving the data from the external api, parsing the data, and returning it.
 */

var request = require('./request'),
    configs = require('./../../config'),
    w = require('winston');

var savedData;

/**
 * Request the weather information from the API.
 *
 * @param {Object} req The request parameters.
 * @param {Object} res The response object to send the data.
 * @param {function} callback The callback to call when the request is complete.
 */
exports.get = function(req, res, callback) {
    if (savedData) {
        callback(savedData);
    } else {
        request.get('http://api.uwaterloo.ca/public/v1/?key=' + configs.weatherKey + '&service=weather&output=json', {}, function(err, data) {
            if (err) {
                w.error(err);
            } else {
                savedData = data;
                callback(data);
            }
        });
    }
};

