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
		let postcode = helpers.postcode.format(req.params.postcode);
	
		let handleSuccess = (clinics) => { 
			
			let results = clinics.result
				.filter(clinic => clinic.postcode === postcode)
				.map(clinic => {
					let formattedAddress = helpers.address.format({
						address1 : clinic.address1,
						address2 : clinic.address2,
						address3 : clinic.address3,
						postcode : clinic.postcode,
						city : clinic.city
					}); 
	
					clinic.formatted = `${clinic.organisation_name || ''} (${formattedAddress})`;
					
					return clinic;	
				});

			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(results));
		}
	
		let handleError = (err) => { 
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 500;
			res.end(JSON.stringify({
				message : 'Internal Server Error'
			}));
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
	
	let handleSuccess = (clinics) => {  
		let pims_managed = 0;
	
		clinics.result.map(clinic => {
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

			clinic.formatted = `${clinic.organisation_name || ''} (${formattedAddress})`;
		});
		
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({
			pims_managed : pims_managed,
			results : clinics.result
		}));
	}

	let handleError = (err) => { 
		res.setHeader('Content-Type', 'application/json');
		res.statusCode = 500;
		res.end(JSON.stringify({
			message : 'Internal Server Error'
		}));
	}

	clinics.getByName(req.params.name)
	       .then(handleSuccess)
	       .catch(handleError);
}

var getByCityHandler = (req,res) => {
	
	let _handleSuccess = (clinics) => {
		let results = {};

		clinics.result.forEach(clinic => {
			let partial_postcode = clinic.partial_postcode; 
			
			if(partial_postcode) {
				results[partial_postcode] ? results[partial_postcode]++ : results[partial_postcode] = 1;	
			}
		}) 

		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({
			results : results,
			total : Object.keys(results).length
		}));
	}

	let _handleError = (err) => { 
		res.setHeader('Content-Type', 'application/json');
		res.statusCode = 500;
		res.end(JSON.stringify({
			message : 'Internal Server Error'
		}));
	}

	clinics.getByCity(req.params.city)
	       .then(_handleSuccess)
	       .catch(_handleError);
}

module.exports = {
	getByPostCode : getByPostCodeHandler,
	getByName : getByNameHandler,
	getByCity : getByCityHandler
}