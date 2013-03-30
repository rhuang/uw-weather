var fs = require('fs'),
    path = require('path');

/**
 * Reads the ./app/routes directory for all the routing files and initializes the routes.
 *
 * @param {Express} app The Express app object.
 */
var Routes = function(app) {
    fs.readdirSync(__dirname + '/app/routes/').forEach(function(name) {
        // Make sure to only read JavaScript files.
        var ext = path.extname(name || '').split('.');
        if (ext[ext.length - 1] == 'js') {
            new require(__dirname + '/app/routes/' + name)(app);
        }
    });
};

module.exports = Routes;

