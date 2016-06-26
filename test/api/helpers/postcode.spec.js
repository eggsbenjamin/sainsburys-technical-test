var should = require('should');
var postcodeHelper = require('../../../api/helpers/postcode');
var fixtures = require('../../fixtures/postcode');

describe('postcode helper', () => {
	
	describe('format', () => {
		
		let format = postcodeHelper.format;
		
		it('exists', () => {
			format.should.exist;
		});

		it('is a function', () => {
			format.should.be.a.Function();
		});

		describe('invalid argument', () => {
			
			let invalidPostcodes = fixtures.format.invalid;

			invalidPostcodes.forEach((invalidPostcode) => {
				it(`${invalidPostcode} throws 'Invalid Postcode'`, () => {
					(() => {
						format(invalidPostcode);
					}).should.throw('Invalid Postcode');
				})	
			});
		});

		describe('valid argument', () => {
			
			let validPostcodes = fixtures.format.valid;

			validPostcodes.forEach((validPostcode) => {
				describe(`${validPostcode.input}`, () => {
					it(`returns ${validPostcode.output}`,  () => {
						format(validPostcode.input).should.equal(validPostcode.output);
					});
				});
			});
		});
	});

	describe('getOutwardCode', () => {
		
		let getOutwardCode = postcodeHelper.getOutwardCode;

		it('exists', () => {
			getOutwardCode.should.exist;
		});

		it('is a function', () => {
			getOutwardCode.should.be.a.Function();
		});

		describe('valid argument', () => {
			
			let validPostcodes = fixtures.getOutwardCode.valid;

			validPostcodes.forEach((validPostcode) => {
				describe(`${validPostcode.input}`, () => {
					it(`returns ${validPostcode.output}`,  () => {
						getOutwardCode.call(postcodeHelper, validPostcode.input).should.equal(validPostcode.output);
					});
				});
			});
			
		});
	});
});
