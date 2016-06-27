var request = require('request-promise');
var utils = require('./utils');
var config = require('../../config');

/**
*	@access public
*	@summary returns a promise that always resolves and appends a status to the result of the prromise indicating if the original promise resolved or rejected
*	@param {Promise} promise
*	@returns {Promise} resolves an array contaning the results of all healthChecks
*/

let perform = (endpoints) => {
	let results = [];	

	for(endpoint in endpoints) {
		results.push(request({
			uri : endpoints[endpoint],
			json : true,
			time : true,
			timeout : config.datasources.connection.timeout,
			resolveWithFullResponse : true
		}));
	}

	return Promise.all(results.map(utils.reflect));
}

/**
*	@access public
*	@summary formats health checks specifying specifying useful information
*	@param {Array} healthChecks
*	@returns {Array} - an array containing the formatted healthChecks
*/

let format = (healthChecks) => {
	let isHealthy = true;
	let formatted = [];
	
	healthChecks.forEach(healthCheck => {
		if(isHealthy) {
			isHealthy = (healthCheck.status === 'resolved');
		}		

		formatted.push({
			service : (healthCheck.result.request) ? healthCheck.result.request.uri.href : healthCheck.result.options.uri,
			isHealthy : (healthCheck.status === 'resolved'),
			message : healthCheck.result.message || '',
			time : healthCheck.result.elapsedTime
		})
	});

	return {
		isHealthy : isHealthy,
		healthChecks : formatted
	};	
}

module.exports = {
	perform : perform,
	format : format
}
