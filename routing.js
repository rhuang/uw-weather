var fs = require('fs'),
    path = require('path');

/**
 * @param {Express} app The Express app object.
 */
module.exports = function(app) {
    fs.readdirSync(__dirname + '/app/routes/').forEach(function(name) {
        var ext = path.extname(name || '').split('.');
        if (ext[ext.length - 1] == 'js') {
            var route = require(__dirname + '/app/routes/' + name);
            route(app);
        }
    });
};
