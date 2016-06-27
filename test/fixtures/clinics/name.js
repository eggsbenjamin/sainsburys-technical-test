module.exports = [
	{
		data : {
		succes : true,
			result : []
		},
		expectedPimsManaged : 0
	},
	{
		data : {
			success : true,
			result : [
				{
					is_pims_managed : 'True'
				}
			]
		},
		expectedPimsManaged : 1
	},
	{
		data : {
			success : true,
			result : [
				{
					is_pims_managed : 'True'
				},
				{
					is_pims_managed : 'True'
				},
				{
					is_pims_managed : 'True'
				}
			]
		},
		expectedPimsManaged : 3
	},
	{
		data : {
			success : true,
			result : [
				{
					is_pims_managed : 'False'
				}
			]
		},
		expectedPimsManaged : 0
	},
	{
		data : {
			success : true,
			result : [
				{
					is_pims_managed : 'False'
				},
				{
					is_pims_managed : 'False'
				},
				{
					is_pims_managed : 'False'
				}
			]
		},
		expectedPimsManaged : 0
	},
	{
		data : {
			success : true,
			result : [
				{
					is_pims_managed : 'False'
				},
				{
					is_pims_managed : 'False'
				},
				{
					is_pims_managed : 'True'
				}
			]
		},
		expectedPimsManaged : 1
	}
];
