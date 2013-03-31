/**
 * Methods for GET, POST, UPDATE, DELETE HTTP requests with URL and parameters.
 */
var http = require('http');

var Request = function() {
    return this;
};

/**
 * Format the query parameters into a query string to be appended to the URL.
 *
 * @param {Object} params An object with the query parameters as the key.
 */
var formatParams_ = function(params) {
    if (params) {
        var requests = [];
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                requests.push(key + '=' + params[key]);
            }
        }
        return '?' + requests.join('&');
    }
    return '';
};

/**
 * Submit a GET request and return the data.
 *
 * @param {string} url The url of the request.
 * @param {Object} params Object with the param parameters as the key and value.
 * @param {function} done The callback function to be executed after request is complete.
 */
Request.prototype.get = function(url, params, done) {
    var data = '';
    http.get(url + formatParams_(params), function(res) {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on('end', function() {
            done(null, JSON.parse(data));
        }).on('error', function(err) {
            done(err, null);
        });
    });
};

module.exports = Request;

