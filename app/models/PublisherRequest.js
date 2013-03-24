var http = require('http');

var formatParams = function(params) {
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

exports.get = function(url, params, done) {
    var data = '';
    http.get(url + formatParams(params), function(res) {
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

