var request = require('request-promise');
var Promise = require('bluebird');	//	'request-as-promised' uses this Promise implementation
var config = require('../../config').api;
var logger = require('../../logger');

/** 
*	@access private
*	@summary handles succesful responses by logging the url and status code
*	@param {Object} response
*	@returns {Promise} resolve
*/

var _handleSuccess = (response) => {  
	logger.log('INFO', `response from : ${response.request.href} (${response.statusCode})`,{
	method : response.request.method,
	href : response.request.href
});
	return response.body;
}

/**
*	@access private
*	@summary handles errors and non 200 responses by logging out info  
*	@param {Object} response
*	@returns {Promise} rejection
*/

var _handleError = (response) => {
	if(response.error) { 
		logger.log('ERROR', `${response.error.message}`, response.error);
		return new Promise.reject(response.error);
	} else {
		logger.log('INFO', `response from : ${response.request.url.hostname} (${response.statusCode})`,{
			method : response.request.method,
			href : response.request.href
		});

		return new Promise.reject({
			statusCode : response.statusCode,
			body : response.body
		});
	}
}

/**
*	@access public
*	@summary makes a request to the clinics by partial postcode endpoint
*	@param {String} partial postcode 
*	@returns {Promise} resolves an object representing the result of the request
*/

var getByPartialPostcode = function(partialPostcode) {
	logger.log('INFO', `making request to ${config.endpoints.CLINICS_POSTCODE}`, {
	partial_postcode : partialPostcode
	});	


	return request({
		uri : config.endpoints.CLINICS_POSTCODE,
		qs : {
			partial_postcode : partialPostcode
		},
		json : true,
		resolveWithFullResponse : true
	}).then(_handleSuccess)
	.catch(_handleError);
}

/**
*	@access public
*	@summary makes a request to the clinics by name endpoint
*	@param {String} name 
*	@returns {Promise} resolves an object representing the result of the request
*/

var getByName = function(name) {
	logger.log('INFO', `making request to ${config.endpoints.CLINICS_NAME}`, {
		organisation_name : name
	});	


	return request({
		uri : config.endpoints.CLINICS_NAME,
		qs : {
			organisation_name : name
		},
		json : true,
		resolveWithFullResponse : true
	}).then(_handleSuccess)
	.catch(_handleError);
}

/**
*	@access public
*	@summary makes a request to the clinics by city endpoint
*	@param {String} city 
*	@returns {Promise} resolves an object representing the result of the request
*/

var getByCity = function(city) { 
	logger.log('INFO', `making request to ${config.endpoints.CLINICS_CITY}`, {
		city : city
	});	
	

	return request({
		uri : config.endpoints.CLINICS_CITY,
		qs : {
			city : city
		},
		json : true,
		resolveWithFullResponse : true
	}).then(_handleSuccess)
	.catch(_handleError);
}

module.exports = {
	getByPartialPostcode : getByPartialPostcode,
	getByName : getByName,
	getByCity : getByCity
}
