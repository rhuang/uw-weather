/**
 * Routes for the weather API.
 */

/**
 * The route for the UW weather API located at http://api.uwaterloo.ca/#!/weather.
 *
 * @param {Express} app The Express server that will render the routes.
 */
module.exports = function(app) {
    app.get('/apis/weather', function(req, res) {
        require(__dirname + '/../models/weather').get(req, res, function(data) {
            res.send(data);
        });
    });
};

