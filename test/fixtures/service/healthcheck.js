module.exports = [
	{
		input : [
			{
			 	result : {
					request : {
						uri : {
							href : '1'
						}
					},
					message : '1',
					elapsedTime : 1
				},
				status : 'resolved'
			},
			{
			 	result : {
					request : {
						uri : {
							href : '2'
						}
					},
					message : '2',
					elapsedTime : 2
				},
				status : 'resolved'
			},
			{
			 	result : {
					request : {
						uri : {
							href : '3'
						}
					},
					message : '3',
					elapsedTime : 3
				},
				status : 'resolved'
			},
		],
		expectedOutput : {
			  "isHealthy": true,
			  "healthChecks": [
			   	{
			      		"service": "1",
			      		"isHealthy": true,
			      		"message": "1",
			      		"time": 1
			    	},
			    	{
			      		"service": "2",
			      		"isHealthy": true,
			      		"message": "2",
			      		"time": 2
			    	},
			    	{
			      		"service": "3",
			      		"isHealthy": true,
			      		"message": "3",
			      		"time": 3
				}
			]
		}	
	},	
	{
		input : [
			{
			 	result : {
					options : {
						uri : 'failed'
					},
					message : 'failed'
				},
				status : 'rejected'
			},
			{
			 	result : {
					request : {
						uri : {
							href : '2'
						}
					},
					message : '2',
					elapsedTime : 2
				},
				status : 'resolved'
			},
			{
			 	result : {
					request : {
						uri : {
							href : '3'
						}
					},
					message : '3',
					elapsedTime : 3
				},
				status : 'resolved'
			},
		],
		expectedOutput : {
			  "isHealthy": false,
			  "healthChecks": [
			   	{
			      		"service": "failed",
			      		"isHealthy": false,
			      		"message": "failed",
			    	},
			    	{
			      		"service": "2",
			      		"isHealthy": true,
			      		"message": "2",
			      		"time": 2
			    	},
			    	{
			      		"service": "3",
			      		"isHealthy": true,
			      		"message": "3",
			      		"time": 3
				}
			]
				
		}	
	},	
	{
		input : [
			{
			 	result : {
					options : {
						uri : 'failed'
					},
					message : 'failed'
				},
				status : 'rejected'
			},
			{
			 	result : {
					options : {
						uri : 'failed'
					},
					message : 'failed'
				},
				status : 'rejected'
			},
			{
			 	result : {
					options : {
						uri : 'failed'
					},
					message : 'failed'
				},
				status : 'rejected'
			}
		],
		expectedOutput : {
			  "isHealthy": false,
			  "healthChecks": [
			   	{
			      		"service": "failed",
			      		"isHealthy": false,
			      		"message": "failed"
			    	},
			    	{
			      		"service": "failed",
			      		"isHealthy": false,
			      		"message": "failed"
			    	},
			    	{
			      		"service": "failed",
			      		"isHealthy": false,
			      		"message": "failed"
			    	}
			]
				
		}	
	},	
	{
		input : [
			{
			 	result : {
					request : {
						uri : {
							href : '1'
						}
					},
					message : '1',
					elapsedTime : 1
				},
				status : 'resolved'
			},
			{
			 	result : {
					options : {
						uri : 'failed'
					},
					message : 'failed'
				},
				status : 'rejected'
			},
			{
			 	result : {
					options : {
						uri : 'failed'
					},
					message : 'failed',
				},
				status : 'rejected'
			},
		],
		expectedOutput : {
			  "isHealthy" : false,
			  "healthChecks": [
			   	{
			      		"service": "1",
			      		"isHealthy": true,
			      		"message": "1",
					"time" : 1
			    	},
			    	{
			      		"service": "failed",
			      		"isHealthy": false,
			      		"message": "failed"
			    	},
			    	{
			      		"service": "failed",
			      		"isHealthy": false,
			      		"message": "failed"
			    	}
			]
		}	
	}	
];
