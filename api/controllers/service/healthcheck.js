var helpers = require('../../helpers');
var config = require('../../../config');
var logger = require('../../../logger');

/**
*	@summary HTTP handler that makes a HTTP request to each of the endpoints in config.api.endpoints, to determine if they're in a healthy state
*	@returns {HTTP Response}
*	200 - an array of formatted healthcheck responses plus a boolean 'isHealthy' indicating if all endpoints are up and healthy
*	500 - on error
*/

let healthcheck = (req,res) => {
	logger.log('INFO', `incoming request : ${req.url}`, {
		client_ip : req.headers['x-forwarded-for'] || req.connection.remoteAddress
	});

	let _handleSuccess = (healthchecks) => {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(helpers.healthcheck.format(healthchecks)));		

		logger.log('INFO', `response sent : ${req.url}`, {
			statusCode : res.statusCode
		});	
	}

	let _handleError = (err) => {
		res.setHeader('Content-Type', 'application/json');
		res.statusCode = 500;
		res.end(JSON.stringify({
			message : 'Internal Server Error'
		}));
		
		logger.log('WARN', `response sent : ${req.url}`, {
			statusCode : res.statusCode,
			message : err.message
		});	

	}

	helpers.healthcheck.perform(config.api.endpoints)
		.then(_handleSuccess)
		.catch(_handleError);
}

module.exports = healthcheck;
