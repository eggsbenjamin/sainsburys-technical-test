var http = require('http');
var Router = require('node-simple-router');
var config = require('./config');
var controllers = require('./api/controllers'); 
var logger = require('./logger');
var app = new Router({
	logging : false		//	disable 'node-simple-router' default logging
});

/*
	route definitions
*/

//	clinics

app.get('/clinics/postcode/:postcode', controllers.clinics.getByPostcode);
app.get('/clinics/name/:name', controllers.clinics.getByName);
app.get('/clinics/city/:city', controllers.clinics.getByCity);

//	service

app.get('/ping', controllers.service.ping);
app.get('/healthcheck', controllers.service.healthcheck);

/*
	initialise
*/

http.createServer(app).listen(config.server.port);

/*
	handle uncaught exceptions
*/

process.on('uncaughtException', ex => { console.log(ex); 
	logger.log('ERROR', 'uncaught fatal exception', ex.Error);
	process.exit(1);
});

module.exports = app;

