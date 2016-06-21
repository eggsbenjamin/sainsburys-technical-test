var should = require('should');
var sinon = require('sinon');
var logger = require('../../logger');

describe('Logger', () => {
	
	describe('log', () => {
		var log, sandbox;

		before(() => {
			log = logger.log;
		});

		it('exists', () => {
			log.should.exist;
		});

		it('is a function', () => {
			log.should.be.a.Function;
		});

		describe('invalid arguments', () => {
			
			describe('level', () => {
				var invalidLevels = [
					-1,
					0,
					1,
					NaN,
					Infinity,
					null,
					undefined,
					{},
					function() {},
					[],
					true,
					false,
					'INVALID_LOG_LEVEL_' + new Date()
				];

				invalidLevels.forEach((invalidLevel) => {
					var error = `Invalid log level - ${invalidLevel}`;

					it(`${invalidLevel} throws '${error}'`, () => {
						() => {
							log(invalidLevel, 'test');
						}.should.throw(`${error}`);	
					});
				});
			});

			describe('message', () => {
				var invalidMessages = [
					-1,
					0,
					1,
					NaN,
					Infinity,
					null,
					undefined,
					{},
					function() {},
					[],
					true,
					false
				];

				invalidMessages.forEach((invalidMessage) => {
					var error = `Invalid log message - ${invalidMessage}`;

					it(`${invalidMessage} throws '${error}'`, () => {
						() => {
							log('INFO', invalidMessage);
						}.should.throw(`${error}`);
					});	
				});
			});
		});

		describe('valid arguments', () => {
			var clock, now;

			var validLevels = [
				'INFO',
				'WARN',
				'ERROR'
			];

			var validMessages = [
				'',
				' ',
				'v',
				'valid log message'
			];	

			beforeEach(() => {
				sandbox = sinon.sandbox.create();
				sandbox.spy(console, 'log');

				now = new Date();
				clock = sinon.useFakeTimers(now.getTime());
			});

			afterEach(() => {
				sandbox.restore();
				clock.restore();
			});
			
			describe('no data argument', () => {
				validLevels.forEach((validLevel) => {
					validMessages.forEach((validMessage) => {

						it(`'${validLevel} | ${validMessage}' - logged correctly`, () => {
							var formattedDate = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
							var expectedLog = `[${formattedDate}] ${validLevel} | ${validMessage} `;
						
							log(validLevel, validMessage);
							console.log.calledWith(expectedLog).should.be.true();
						});
					});
				})
			});

			describe('data argument passed', () => {
				var logData = [
					1,
					true,
					'valid data',
					{},
					{ hello : 'world' },
					[],
					[{ hello : 'world'}, { hello : 'world' }]
				]

				beforeEach(() => {
					sandbox.spy(JSON, 'stringify');	
				});

				logData.forEach((data) => {
							
					it(`INFO | Test Log | ${data} - logged correctly`, () => {
						log('INFO', 'Test Log', data);
						JSON.stringify.calledWith(data).should.be.true();		
					});					
				});	
			});
		})
				
	});
});
