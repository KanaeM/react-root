var mongoose = require('mongoose');
var chalk = require('chalk');

// Replace uri and database values as needed
config = {
	uri : {
		test:  'mongodb://localhost:27017/',
		dev: 'mongodb://heroku_qm0ktctw:fg2sc6bfdlde5921be3qef5op9@ds035776.mlab.com:35776/heroku_qm0ktctw/',
		prod: 'mongodb://' + process.env.MONGODB_URI + '/'
	},
	database: {
		name: 'mern-starter',
		options: {
			user: '',
			pass: ''
		}
	},
};

// 
var mongoUrl = config.uri.dev || config.uri.dev || config.uri.prod;

var mongoDB = mongoUrl + config.database.name;

// mongod --dbpath /usr/local/lib/MongoDB/data/ --profile 1 --slowms 2000
	

mongoose.connect(mongoDB, config.database.options, function(err) {
	mongoose.Promise = global.Promise;
	if (err) {
		console.log(chalk.white.bgRed.bold('Mongoose %s exception %s'), mongoose.version, err);
	} else {
		console.log(chalk.black.bgCyan('Mongoose %s successfully connected to:'), mongoose.version, ' ' + mongoDB);
	}
});

var db = mongoose.connection;

module.exports = db;


