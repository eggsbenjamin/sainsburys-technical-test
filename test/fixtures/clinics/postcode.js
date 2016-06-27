module.exports = [
	{
		data : {
			success : true,
			result : []
		},
		postcodeURIParam : 'SW111AA',
		expectedClinics : 0
	},
	{
		data : {
			success : true,
			result : [
				{
					postcode : 'SW11 1AA'
				}
			]
		},
		postcodeURIParam : 'SW111AA',
		expectedClinics : 1
	},
	{
		data : {
			success : true,
			result : [
				{
					postcode : 'SW10 1AA'
				},
				{
					postcode : 'SW11 1AA'
				},
				{
					postcode : 'SW112 1AA'
				}
			]
		},
		postcodeURIParam : 'SW111AA',
		expectedClinics : 1
	},
	{
		data : {
			success : true,
			result : [
				{
					postcode : 'SW10 1AA'
				},
				{
					postcode : 'SW11 1AA'
				},
				{
					postcode : 'SW12 1AA'
				},
			]
		},
		postcodeURIParam : 'SW131AA',
		expectedClinics : 1
	}
];
