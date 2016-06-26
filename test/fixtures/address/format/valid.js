module.exports = [
	{
		input : {
			address1 : '10 Fake Street'
		},
		output : '10 Fake Street'
	},
	{
		input : {
			address1 : '10 Fake Street',
			address2 : 'Fake Town'
		},
		output : '10 Fake Street, Fake Town'
	},
	{
		input : {
			address1 : '10 Fake Street',
			address2 : 'Fake Town',
			address3 : 'Fauxingham'
		},
		output : '10 Fake Street, Fake Town, Fauxingham'
	},
	{
		input : {
			address1 : '10 Fake Street',
			address2 : 'Fake Town',
			address3 : 'Fauxingham',
			postcode : 'FK1 2FX'
		},
		output : '10 Fake Street, Fake Town, Fauxingham, FK1 2FX'
	},
	{
		input : {
			address1 : '10 Fake Street',
			address2 : 'Fake Town',
			address3 : 'Fauxingham',
			postcode : 'FK1 2FX',
			city : 'Mockingham'
		},
		output : '10 Fake Street, Fake Town, Fauxingham, FK1 2FX, Mockingham'
	},
	{
		input : {
			postcode : 'FK1 2FX'
		},
		output : 'FK1 2FX'
	},
	{
		input : {
			address1 : null,
			address2 : 'Fake Town',
			postcode : 'FK1 2FX'
		},
		output : 'Fake Town, FK1 2FX'
	},
	{
		input : {
			address1 : undefined,
			city : 'Mockingham',
			postcode : 'FK1 2FX'
		},
		output : 'Mockingham, FK1 2FX'
	},
	{
		input : {
			address1 : undefined,
			address2 : undefined,
			address3 : undefined,
			postcode : undefined,
			city : undefined
		},
		output : ''
	},
	{
		input : {
			address1 : null,
			address2 : null,
			address3 : null,
			postcode : null,
			city : null
		},
		output : ''
	},
];
