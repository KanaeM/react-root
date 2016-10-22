var pros =  
	{
		"firstName": "Elsa",
		"lastName": "Jade",
		"userName": "elsa",
		"password": "password",
		"email": "elsa@mail.com",
		"address1": "Class St",
		"address2": "1 fl",
		"city": "Staten Island",
		"state": "NY",
		"zip": "01207",
		"phone": "201-322-0991",
		"requests": [
			{
				"task": "Mechanic-Auto",
				"city": "Leonia",
				"date": "10/21/2016",
				"time": "08:00",
				"description": "Change Battery",
				"status": { 
					//	true if Receiver select a provider from providers array
					"confirmed": false
					"provider": '',
					"done": false,
				},
				"providers": [	// all potential providers
					{
						"provider": '',
						"available": true
					}
				]

			}
		]
  }

	{
		"firstName": "Robin",
		"lastName": "Mern",
		"userName": "robin",
		"password": "password",
		"email": "robin@mail.com",
		"address1": "His Place",
		"address2": "BSMT",
		"city": "Lyndhurts",
		"state": "NJ",
		"zip": "07987",
		"phone": "201-322-0991",
		"services": {
			"fee": 0,
			"anytime": false,
			"active": true,
			"city": ["Jersey City", "Leonia"],
			"dates":["10/20/2016", "10/21/2016", "10/22/2016"],
			"task": ["Mechanic-Auto", "Transportaion-Ride"]
		},
		"todos": []
	}

	{
		"firstName": "David",
		"lastName": "Mern",
		"userName": "david",
		"password": "password",
		"email": "david@mail.com",
		"address1": "Grand St",
		"address2": "2 fl.",
		"city": "Englewood",
		"state": "NJ",
		"zip": "07090",
		"phone": "201-322-0991",
		"services": {
			"fee": 0,
			"anytime": true,
			"active": true,
			"city": ["Jersey City", "Leonia"],
			"dates":["10/20/2016", "10/21/2016", "10/22/2016"],
			"task": ["Mechanic-Auto", "Transportaion-Ride"]
		},
		"todos": []
	}


	"todos": 
	{
		"task": "Beauty-Manicure",
		"city": "Jersey City",
		"date": "10/20/2016",
		"time": "09:00",
		"description": "Need manicure soon",
	}




