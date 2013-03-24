var request = require('./request'),
    configs = require('./../../config'),
    w = require('winston');

/**
 * @params {Object} req The request parameters.
 * @params {Object} res The response object to send the data.
 * @params {function} callback The callback to call when the request is complete.
 */
exports.get = function(req, res, callback) {
    request.get('http://api.uwaterloo.ca/public/v1/?key=' + configs.weatherKey + '&service=weather&output=json', {}, function(err, data) {
        if (err) w.error(err);
        else callback(data);
    });
};
