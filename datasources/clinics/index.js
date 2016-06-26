var request = require('request-promise');
var config = require('../../config').api;

/**
*	@access public
*	@summary makes a request to the clinics by partial postcode endpoint
*	@param {String} partial postcode 
*	@returns {Promise} resolves an object representing the result of the request
*/

var getByPartialPostcode = function(partialPostcode) {
	return request({
		uri : config.endpoints.CLINICS_POSTCODE,
		qs : {
			partial_postcode : partialPostcode
		},
		json : true,
		simple : false,
		resolveWithFullResponse : true
	});
}

/**
*	@access public
*	@summary makes a request to the clinics by name endpoint
*	@param {String} name 
*	@returns {Promise} resolves an object representing the result of the request
*/

var getByName = function(name) {
	return request({
		uri : config.endpoints.CLINICS_NAME,
		qs : {
			organisation_name : name
		},
		json : true,
		simple : false,
		resolveWithFullResponse : true
	});
}

/**
*	@access public
*	@summary makes a request to the clinics by city endpoint
*	@param {String} city 
*	@returns {Promise} resolves an object representing the result of the request
*/

var getByCity = function(city) { 
	return request({
		uri : config.endpoints.CLINICS_CITY,
		qs : {
			city : city
		},
		json : true,
		simple : false,
		resolveWithFullResponse : true
	});
}

module.exports = {
	getByPartialPostcode : getByPartialPostcode,
	getByName : getByName,
	getByCity : getByCity
}
