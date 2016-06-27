var should = require('should');
var sinon = require('sinon');
var httpMocks = require('node-mocks-http');
var Promise = require('bluebird');
var clinicsController = require('../../../api/controllers/clinics');
var fixtures = require('../../fixtures/clinics');
var datasources = require('../../../datasources');

describe('clinics controller', () => {

	let sandbox, request, response;

	describe('getByNameHandler', () => {
		
		let getByNameHandler = clinicsController.getByName;

		it('exists', () => {
			getByNameHandler.should.exist;
		});

		it('is a function', () => {
			getByNameHandler.should.be.a.Function();
		});

		describe('data layer resolution', () => {
			
			let validResponses = fixtures.name;
			
			beforeEach(() => {
				sandbox = sinon.sandbox.create();
				sandbox.stub(datasources.clinics, 'getByName');

				request = httpMocks.createRequest({
					method : 'GET',
					params : {
						postcode : 'cf313nu'
					}	
				});
				response = httpMocks.createResponse();
			});

			afterEach(() => {
				sandbox.restore();
			});
			
			validResponses.forEach((validResponse) => {

				it('returns a 200 OK json response', () => {
					datasources.clinics.getByName.returns(new Promise.resolve(validResponse));
					getByNameHandler(request, response);
					response._getStatusCode().should.equal(200);					
//					response._isJSON().should.be.true();
				});

				it('returns the correct \'pims_managed\' value', () => {
					datasources.clinics.getByName.returns(new Promise.resolve(validResponse.data));
					getByNameHandler(request, response);
					var responseBody = JSON.stringify(response._getData());
					console.log(response);
					responseBody.pims_managed.should.eventuslly.equal(validResponse.expectedPimsManaged);
				});
			});	
		});
	});
});

