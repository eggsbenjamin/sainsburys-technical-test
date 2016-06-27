var supertest = require('supertest');
var sinon = require('sinon');
var should = require('should');
var Promise = require('bluebird');
var datasources = require('../../../../datasources');
var fixtures = require('../../../fixtures/clinics/postcode');
var server = require('../../../../index.js');
var helpers = require('../../../../api/helpers/postcode');
var app = supertest(server);
var uri = '/clinics/postcode';

describe('get by postcode endpoint', () => {

	let sandbox;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		sandbox.stub(datasources.clinics, 'getByPartialPostcode');
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('valid response from datasource', () => {
	
		fixtures.forEach(fixture => {
			
			it('returns a 200 OK with the correct result', (done) => {
				datasources.clinics.getByPartialPostcode.returns(new Promise.resolve(fixture.data));
				
				app.get(`${uri}/${fixture.postcodeURIParam}`)
				   .send()
				   .expect(200)
				   .expect('Content-Type', /json/)
				   .end((err,res) => {
					if(err) {
						done(err);
					} else {
						res.body.length.should.equal(fixture.expectedClinics);
						res.body.forEach(clinic =>  clinic.formatted.should.exist);
	
						done();					
					}
				   });
			});		
		});
	});

	describe('rejection from datasource', () => {

		it('returns a 400 if an invalid postcode is passed', () => {
			datasources.clinics.getByPartialPostcode.returns(new Promise.reject({ message : 'Invalid Postcode' }));

			app.get('clinics/name/test')
				.send()
				.expect(400, {
					message : 'Invalid Postcode'
				})
				.expect('Content-Type', /json/)
				.end(err => done(err))

		});

		it('returns a 500', () => {
			datasources.clinics.getByPartialPostcode.returns(new Promise.reject({ error : 'mock error' }));
	
			app.get('clinics/name/test')
				.send()
				.expect(500)
				.expect('Content-Type', /json/)
				.end(err => done(err))
		});
	});
});
