# Nodejs Technical Tests

## Design Decisions

Normally when building a HTTP server my first port of call would be express.js or another framework that provides various API's to make building an application that much easier and faster. Because this exercise is designed for candidates to demonstrate their abilities I tried to use as few NPM modules as possible.

### NPM Modules Used

#### Testing

* should - BDD assertion library 
* supertest - BDD HTTP server test suite
* sinon - mocking/stubbing library 

#### App

* node-simple-router
* request-promise

I used request-promise because the spec said to use a promise based request library for communicating with the data.gov APIs and I used node-simple-router because I wanted exactly that. A simple router that I could use to route requests to the app

### Hindsight

Although I found node-simple-router met the majority of my requirements I found it lacking in certain places. If you look at the handlers each request and response is logged in each of them which isn't ideal. Ideally I'd like to have a centralised logger so that the only logging that happens in the handlers themselves would be specific to their actions (e.g. errors).

I did want to unit test all handlers but, due to time constraints, I decided to use supertest to make requests to each endpoint but mock the datasources (data.gov endpoints) to test the handlers and their integration simultaneously.


* ~~[x] __Logger__~~
* ~~[x] __Helper Functions_~~_
	* ~~[x] postcode helper~~ 
	* ~~[x] address format~~ 
* ~~[x] __API__~~
	* ~~[x] __Data Endpoints__~~
		* ~~[x] postcode endpoint~~
		* ~~[x] city endpoint~~
		* ~~[x] name endpoint~~
	* ~~[x] __Service Endpoints__~~
		* ~~[x] ping~~
		* ~~[x] healthcheck~~
	* ~~[x] define routes~~
* ~~[x] __Data Layer__~~	
	* ~~[x] clinics~~
