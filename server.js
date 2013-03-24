/**
 * Module dependencies.
 */

var express = require('express'),
    weather = require('./app/routes/WeatherRoutes'),
    http = require('http'),
    path = require('path'),
    w = require('winston');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 5000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/weather', weather.weather);

http.createServer(app).listen(app.get('port'), function(){
    w.info("Express server listening on port " + app.get('port'));
});
