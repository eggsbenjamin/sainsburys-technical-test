/*
*	Private
*/ 

/**
 *	@summary private array containing the recognised valid log-levels 	
 *	@property {String[]}
 *
 *		- TODO - should this be configurable?
 */  

var _levels = [
	'INFO',
	'WARN',
	'ERROR'
];

/*
*	Validation
*/

/**
 *	@access private 
 *	@summary validates that the level argument exists in the '_levels' array
 *	@param {String} level - string representing the log-level
 *	@returns {Boolean} boolean representing the validity of the log-level 
 */

var _validLevel = (level) => {
	return _levels.indexOf(level) >= 0;
}

/**
 *	@access private 
 *	@summary validates that the message argument is a string
 *	@param {String} message - string representing the log message
 *	@returns {Boolean} boolean representing the validity of the message
 */ 

var _validMessage = (message) => {
	return typeof(message) === 'string';
}

/**
 *	@access private 
 *	@summary validates the log level and message.
 *	@param {String} level - the level of the log e.g INFO or ERROR
 *	@param {String} message - a meaningful message associated with the log
 *	@throws 'Invalid log level - @level' - if the log-level isn't a recognised level
 *	@throws 'Invalid log message - @message' if the log-message isn't a string 
 */

var _validateArguments = (level, message) => {
	if(!_validLevel(level)) {
		throw new Error(`Invalid log level - ${level}`);
	} else if (!_validMessage(message)) {
		throw new Error(`Invalid log message - ${message}`);
	}
}

/*
*	Formatting
*/

/**
 *	@access private
 *	@summary formats the current date dd/mm/yyyy hh:MM:ss
 *	@returns {String} formatted date
 */  

var _getFormattedDate = () => {
	var now = new Date();
	return `${now.getDate()}/${now.getMonth()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

/**
 *	@access private
 *	@summary formats the log into a standardised, readable string 
 *	@param {String} level - the level of the log e.g INFO or ERROR
 *	@param {String} message - a meaningful message associated with the log
 *	@param {*} [data] - optional log data
 *	@returns {String} formatted log
 */

var _getFormattedLog = (level, message, data) => {
	return `[${_getFormattedDate()}] ${level} | ${message} ${data ? `| ${JSON.stringify(data)}` : '' }`;
}

/*
 *	Public
 */

/**
 *	@access public
 *	@summary validates the log level and log message and, if they're valid, logs them and any data passed to the console.
 *	@param {String} level - the level of the log e.g INFO or ERROR
 *	@param {String} message - a meaningful message associated with the log
 *	@param {*} [data] - optional log data
 */

var log = (level, message, data) => { 
	_validateArguments(level, message);
	console.log(_getFormattedLog(level, message, data));
}

module.exports ={
	log : log
}
