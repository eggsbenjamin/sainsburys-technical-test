var helpers = require('../../helpers');
var config = require('../../../config');
var logger = require('../../../logger');

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
