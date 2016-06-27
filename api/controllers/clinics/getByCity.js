var datasources = require('../../../datasources');
var clinics = datasources.clinics;
var helpers = require('../../helpers');
var logger = require('../../../logger');

/**
*       @summary HTTP handler that calls the get clinics by city endpoint 
*       @returns {HTTP Response} 
*       200 {Object} - containing a count of each unique partial postcode returned along with the total count of unique postcodes 
*       500 - {Object} on error
*/

let getByCity = (req,res) => {

        logger.log('INFO', `incoming request : ${req.url}`, {
                client_ip : req.headers['x-forwarded-for'] || req.connection.remoteAddress
        });

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

        clinics.getByCity(req.params.city)
               .then(_handleSuccess)
               .catch(_handleError);
}

module.exports = getByCity;
