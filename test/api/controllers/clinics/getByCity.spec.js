var should = require('should');
var sinon = require('sinon');
var supertest = require('supertest');
var Promise = require('bluebird');
var server = require('../../../../index');
var datasources = require('../../../../datasources/clinics');
var fixtures = require('../../../fixtures/clinics/city');
var app = supertest(server);
var url = '/clinics/city/test';

describe('get by city endpoint', () => {
	
	let sandbox;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		sandbox.stub(datasources, 'getByCity');
	})

	afterEach(() => {
		sandbox.restore();
	});

	describe('valid response from datasource', () => {
		
		fixtures.forEach((fixture) => {
			
			it('returns 200 OK with the correct response', done => {
				datasources.getByCity.returns(new Promise.resolve(fixture.data));				
		
				app.get(url)
				   .send()
				   .expect('Content-Type', /json/)
				   .expect(200, fixture.expectedOutput)
				   .end(err => done(err))		
			});
		});
	});

	describe('rejection from datasource', () => {
		
		it('returns a 500', done => {
			datasources.getByCity.returns(new Promise.reject({ error : 'mock error' }));				

			app.get(url)
				.send()
				.expect('Content-Type', /json/)
				.expect(500, {
					message : 'Internal Server Error'
				})
				.end(err => done(err))		
		});
	});
});

