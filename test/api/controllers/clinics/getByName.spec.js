var supertest = require('supertest');
var sinon = require('sinon');
var should = require('should');
var Promise = require('bluebird');
var datasources = require('../../../../datasources');
var fixtures = require('../../../fixtures/clinics/name');
var server = require('../../../../index.js');
var helpers = require('../../../../api/helpers/address');
var app = supertest(server);
var uri = '/clinics/name/eye';


describe('get clinic by name endpoint', () => {
	
	let sandbox;

	describe('valid response from datasource', () => {

		beforeEach(() => {
			sandbox = sinon.sandbox.create();
			sandbox.stub(datasources.clinics, 'getByName');
		});

		afterEach(() => {
			sandbox.restore();
		});

		fixtures.forEach(fixture => {

			it('returns a JSON 200 OK w/the correct pims_managed and results', done => {
				datasources.clinics.getByName.returns(new Promise.resolve(fixture.data));
				
				app.get(uri)
				   .send('')
				   .expect(200)
				   .expect('Content-Type', /json/)
				   .end((err,res) => { 
				   	if(err) {
						done(err);
					} else { 
						res.body.pims_managed.should.equal(fixture.expectedPimsManaged);
						res.body.results.length.should.equal(fixture.data.result.length);
						res.body.results.forEach(result => {
							result.formatted.should.exist;
						});

						done();
					}
				   });
			});	
		});
	});

	describe('rejection from datasource', () => {
		
		beforeEach(() => {
			sandbox = sinon.sandbox.create();
			sandbox.stub(datasources.clinics, 'getByName');
		});

		afterEach(() => {
			sandbox.restore();
		});

	
		it('returns a 500', done => {
			datasources.clinics.getByName.returns(new Promise.reject({}));

			app.get(uri)
			   .send()
			   .expect(500)
			   .end(err => {
				if(err) {
					done(err);
				} else {
					done();
				}
			   })
		});
	});

});
