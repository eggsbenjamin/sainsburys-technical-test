var should = require('should');
var sinon = require('sinon');
var supertest = require('supertest');
var Promise = require('bluebird');
var server = require('../../../../index');
var helpers = require('../../../../api/helpers');
var fixtures = require('../../../fixtures/service/healthcheck');
var app = supertest(server);
var url = '/healthcheck';

describe('healthcheck endpoint', () => {

	let sandbox;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		sandbox.stub(helpers.healthcheck, 'perform');
	});

	afterEach(() => {
		sandbox.restore();
	});

	fixtures.forEach(fixture => {
		it('returns a 200 with the correct response', done => {

			helpers.healthcheck.perform.returns(new Promise.resolve(fixture.input));

			app.get(url)
				.send()
			   	.expect('Content-Type', /json/)
			   	.expect(200, fixture.expectedOutput)
			   	.end(err => done(err))
		});
	});

	it('returns a 500', done => {
		helpers.healthcheck.perform.returns(new Promise.reject({}));
		
		app.get(url)
			.send()
			.expect('Content-Type', /json/)
			.expect(500, {
				message : 'Internal Server Error'
			})
			.end(err => done(err))
	});
});

