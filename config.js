module.exports = {
	
	server : {
		port : 3000
	},
	
	api : {
		endpoints : {
			CLINICS_POSTCODE : 'http://data.gov.uk/data/api/service/health/clinics/partial_postcode',
			CLINICS_NAME : 'http://data.gov.uk/data/api/service/health/clinics/organisation_name',
			CLINICS_CITY : 'http://data.gov.uk/data/api/service/health/clinics'
		}
	}
}
