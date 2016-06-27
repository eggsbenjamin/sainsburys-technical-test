var http = require('http');
var Router = require('node-simple-router');
var config = require('./config');
var controllers = require('./api/controllers');
var app = new Router({
	logging : false		//	disable 'node-simple-router' default logging
});

/*
	route definitions
*/

//	clinics

app.get('/clinics/postcode/:postcode', controllers.clinics.getByPostCode);
app.get('/clinics/name/:name', controllers.clinics.getByName);
app.get('/clinics/city/:name', controllers.clinics.getByCity);

//	service

app.get('/ping', controllers.service.ping);
app.get('/healthcheck', controllers.service.healthcheck);

/*
	initialise
*/

http.createServer(app).listen(config.server.port);

module.exports = app;

