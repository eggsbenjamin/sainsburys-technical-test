var datasources = require('../../../datasources');
var clinics = datasources.clinics;
var helpers = require('../../helpers');
var logger = require('../../../logger');

/**
*       @summary HTTP handler that calls the get clinics by name endpoint 
*       @returns {HTTP Response} 
*       200 - a formatted results set with and extra 'pims_managed' property 
*       500 - on error
*/

let getByName = (req,res) => {

        logger.log('INFO', `incoming request : ${req.url}`, {
                client_ip : req.headers['x-forwarded-for'] || req.connection.remoteAddress
        }); 

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

        clinics.getByName(req.params.name)
               .then(handleSuccess)
               .catch(handleError);
}

module.exports = getByName;
