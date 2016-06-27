var supertest = require('supertest');
var server = require('../../../../index');
var app = supertest(server);
var url = '/ping';

describe('ping service endpoint', () => {
	
	it('returns a 200 with no body', done => {
		app.get(url)
			.send()
		   	.expect(200, '')
			.end(err => done(err))
	});
});

