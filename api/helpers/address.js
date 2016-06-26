/**
*	@access public
*	@summary formats address components into a comma delimeted string
*	@param {String} location
	@returns {String} comma delimted string containing each own property of the location object
*/

var format = function(location) { 
	let locationValues = Object.keys(location).map(key => location[key]).filter(value => (value) ? true : false)

	return [].join.call(locationValues, ', ');
}

module.exports = {
	format : format
}
