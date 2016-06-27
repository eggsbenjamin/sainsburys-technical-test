/**
*	@access public
*	@summary takes a promise as a argument, calls it and the resolves whatever the result of the promise is be it a rejection or resolution
*	@param {Promise} promise 
*	@returns {Promise} always resolved
*/

let reflect = (promise) => {
	return promise.then(
		result => { return { result : result, status : 'resolved' }},
		error => { return { result : error, status : 'rejected' }}
	);
}

module.exports ={
	reflect : reflect
}
