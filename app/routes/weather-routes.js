/**
 * The route for the UW weather API located at http://api.uwaterloo.ca/#!/weather.
 */
module.exports = function(app) {
    app.get('/apis/weather', function(req, res) {
        require(__dirname + '/../models/weather').get(req, res, function(data) {
            res.send(data);
        });
    });
};

