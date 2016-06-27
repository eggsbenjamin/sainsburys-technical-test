module.exports = [
	{
		data : {
			result : []
		},
		expectedOutput : {
			results : {},
			total : 0
		}
	},
	{
		data : {
			result : [
				{
					partial_postcode : undefined
				}
			]
		},
		expectedOutput : {
			results : {},
			total : 0
		}
	},
	{
		data : {
			result : [
				{
					partial_postcode : 'NW1'	
				}
			]
		},
		expectedOutput : {
			results : {
				NW1 : 1
			},
			total : 1
		}
	},
	{
		data : {
			result : [
				{
					partial_postcode : 'NW1'			
				},
				{	
					partial_postcode : 'NW1'			
				},
				{
					partial_postcode : 'NW1'			
				}
			]
		},
		expectedOutput : {
			results : {
				NW1 : 3
			},
			total : 1
		}
	},
	{
		data : {
			result : [
				{
					partial_postcode : 'NW1'			
				},
				{
					partial_postcode : 'NW1'			
				},
				{
					partial_postcode : 'NW2'			
				}
			]
		},
		expectedOutput : {
			results : {
				NW1 : 2,
				NW2 : 1
			},
			total : 2
		}
	},
	{
		data : {
			result : [
				{
					partial_postcode : 'NW1'			
				},
				{
					partial_postcode : 'NW1'			
				},
				{
					partial_postcode : 'NW2'			
				},
				{
					partial_postcode : 'NW2'			
				},
				{
					partial_postcode : 'NW3',	
				},
				{
					partial_postcode : 'NW4'			
				},
				{
					partial_postcode : 'NW5'			
				},
				{
					partial_postcode : 'NW6'			
				},
				{
					partial_postcode : 'NW7'	
				}
			]
		},
		expectedOutput : {
			results : {
				NW1 : 2,
				NW2 : 2,
				NW3 : 1,
				NW4 : 1,
				NW5 : 1,
				NW6 : 1,
				NW7 : 1
			},
			total : 7	
		}
	},
	{
		data : {
			result : [
				{
					partial_postcode : 'NW1'			
				},
				{
					partial_postcode : 'NW1'			
				},
				{	
					partial_postcode : 'NW2'			
				},
				{
					partial_postcode : 'NW2'			
				},
				{
					partial_postcode : 'NW3',	
				},
				{
					partial_postcode : 'NW4'			
				},
				{
					partial_postcode : 'NW5'			
				},
				{
					partial_postcode : 'NW6'			
				},
				{
					partial_postcode : 'NW7'	
				},
				{
					partial_postcode : undefined
				},
				{
					partial_postcode : undefined
				}
			]
		},
		expectedOutput : {
			results : {
				NW1 : 2,
				NW2 : 2,
				NW3 : 1,
				NW4 : 1,
				NW5 : 1,
				NW6 : 1,
				NW7 : 1,
			},
			total : 7	
		}
	}
]
