var datasources = require('../../../datasources');
var clinics = datasources.clinics;
var helpers = require('../../helpers');
var logger = require('../../../logger');

/**
*       @summary HTTP handler that calls the get clinics by partial postcode endpoint 
*       @returns {HTTP Response} 
*       200 - a formatted results set containing only the results that match the 'postcode' uri parameter and an extra property 'formatted' 
*       500 - on error
*/

let getByPostCode = (req,res) => {

	logger.log('INFO', `incoming request : ${req.url}`, {
                client_ip : req.headers['x-forwarded-for'] || req.connection.remoteAddress
        }); 

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

			logger.log('INFO', `response sent : ${req.url}`, {
                        	statusCode : res.statusCode
                	});
                }

                let handleError = (err) => {
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

	        logger.log('ERROR', `response sent : ${req.url}`, {
                        statusCode : res.statusCode,
                        message : err.message
                });
        }
}

module.exports = getByPostCode;
