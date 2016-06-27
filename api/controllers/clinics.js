var datasources = require('../../datasources');
var clinics = datasources.clinics;
var helpers = require('../helpers');
var logger = require('../../logger');

/**
*	@summary HTTP handler that calls the get clinics by partial postcode endpoint 
*	@returns {HTTP Response} 
*	200 - a formatted results set containing only the results that match the 'postcode' uri parameter and an extra property 'formatted' 
*	500 - on error
*/

var getByPostCodeHandler = (req,res) => {
	
	try {
		logger.log('INFO', 'incoming request', {
			uri : req.url,
			headers : req.headers,
			method : req.method,
			user_ip : req.headers['x-forwarded-for'] || req.connection.remoteAddress
		});

		let postcode = helpers.postcode.format(req.params.postcode);
	
		let handleSuccess = (clinics) => { 
			
			logger.log('INFO', 'clinics By name handler success', clinics);		
			
			let results = clinics.result
				.filter(clinic => (clinic.postcode === postcode) ? true : false)
				.map(clinic => {
					let formattedAddress = helpers.address.format({
						address1 : clinic.address1,
						address2 : clinic.address2,
						address3 : clinic.address3,
						postcode : clinic.postcode,
						city : clinic.city
					}); 
	
					clinic.formatted = `${clinic.organisation_name} (${formattedAddress})`;
				});

			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(results));
		}
	
		let handleError = (err) => { console.log(err);
			logger.log('ERROR', 'clinics by postcode handler error', err);
			res.statusCode = 500;
			res.end();
		}
		
		clinics.getByPartialPostcode(helpers.postcode.getOutwardCode(req.params.postcode))
		       .then(handleSuccess)
		       .catch(handleError);		
		
	} catch(ex) {
		logger.log('ERROR', 'clinics by postcode exception', ex);
		
		let status, msg;

		switch(ex.message) {
			case 'Invalid Postcode' :
				status = 400;
				msg = 'Invalid Postcode';
				break;
			default :
				status = 500;
				msg = 'Internal Server Error';
		}
	
		res.statusCode = status;
		res.end(JSON.stringify({ message : msg }));
	}	
}

/**
*	@summary HTTP handler that calls the get clinics by name endpoint 
*	@returns {HTTP Response} 
*	200 - a formatted results set with and extra 'pims_managed' property 
*	500 - on error
*/

var getByNameHandler = (req,res) => {
	
	logger.log('INFO', 'Incoming Request', {
		uri : req.url,
		headers : req.headers,
		method : req.method,
		user_ip : req.headers['x-forwarded-for'] || req.connection.remoteAddress
	});
	
	let handleSuccess = (clinicResults) => {  
		logger.log('INFO', 'Clinics By Name Handler Success', clinicResults);		

		let pims_managed = 0;
		let responseBody = {};
		
		clinicResults.result.map(clinic => {
			if(clinic.is_pims_managed === 'True') {
				pims_managed++;
			}

			let formattedAddress = helpers.address.format({
				address1 : clinic.address1,
				address2 : clinic.address2,
				address3 : clinic.address3,
				postcode : clinic.postcode,
				city : clinic.city
			}); 

			clinic.formatted = `${clinic.organisation_name} (${formattedAddress})`;
		});
		
		responseBody.pims_managed = pims_managed;
		responseBody.results = clinicResults.result;
		
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(responseBody));
	}

	let handleError = (err) => {
		logger.log('ERROR', 'Clinics By Name Handler Error', err);				

		res.statusCode = 500;
		res.end();
	}

	clinics.getByName(req.params.name)
	       .then(handleSuccess)
	       .catch(handleError);
}

var getByCityHandler = (req,res) => {

}

module.exports = {
	getByPostCode : getByPostCodeHandler,
	getByName : getByNameHandler,
	getByCity : getByCityHandler
}
