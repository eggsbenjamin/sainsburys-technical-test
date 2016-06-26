var should = require('should');
var addressHelper = require('../../../api/helpers/address');
var fixtures = require('../../fixtures/address');

describe('address helper', () => {

	describe('format', () => {
		
		let format = addressHelper.format;	
		
		it('exists', () => {
			format.should.exist;
		});		
	
		it('is a function', () => {
			format.should.be.a.Function();
		});

		describe('valid argument', () => {
			
			let validAddresses = fixtures.format.valid;

			validAddresses.forEach((validAddress) => {
				describe(`${JSON.stringify(validAddress.input)}`, () => {
					it(`returns ${validAddress.output}`, () => {
						format(validAddress.input).should.equal(validAddress.output);
					}); 
				});
			});
		});
	});
});

