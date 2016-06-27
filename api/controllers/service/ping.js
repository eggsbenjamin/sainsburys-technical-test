var logger = require('../../../logger');

let ping = (req,res) => {
	logger.log('INFO', `incoming request : ${req.url}`, {
		user_ip : req.headers['x-forwarded-for'] || req.connection.remoteAddress
	});

	res.end();

	logger.log('INFO', `response sent : ${req.url}`, {
		statusCode : res.statusCode
	});
}

module.exports = ping;
