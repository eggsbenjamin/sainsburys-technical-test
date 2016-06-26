/**
*	@access public 
*	@summary formats a string into a standardised postcode format. (All caps and a space between the outward code (e.g. TW20) and the inward code (e.g 6TE)
*	@param {String} postcode
*	@throws {String} 'Invalid postcode' if the postcode argument is not a potentially valid UK postcode 
*	@returns {String} formatted postcode 
*/

let format = function(postcode) {
	if(postcode && typeof(postcode) === 'string') {
		postcode = postcode.replace(/ /g, '');
		
		if(postcode.length < 5 || postcode.length > 7) {
			throw new Error('Invalid Postcode');
		} else {
			let formattedPostcode = [postcode.slice(0, postcode.length - 3), ' ', postcode.slice(postcode.length - 3)].join(''); //	insert space at correct position
			return formattedPostcode.toUpperCase();
		}			
	} else {
		throw new Error('Invalid Postcode');
	}
}

/**
*	@access public 
*	@summary returns a formatted outward portion of a potcode (e.g W1A)
*	@param {String} postcode
*	@throws {String} 'Invalid postcode' if the postcode argument is not a potentially valid UK postcode 
*	@returns {String} outward code
*/

let getOutwardCode = function(postcode) {
	return this.format(postcode).split(' ')[0];
}

module.exports = {
	format : format,
	getOutwardCode :getOutwardCode
}
