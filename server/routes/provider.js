var mongoose = require('mongoose');
var Provider = require('../../database/models/Provider.js');
var provider = require('express').Router();
var bodyParser = require('body-parser');
var chalk = require('chalk');

// ** <TODO> ** callback function to avoid duplicating it all over
// var callback = function(err, pro) {
// 	console.log('callback')
// 	if(err){
// 		console.log(chalk.white.bgRed.bold(err));
// 		res.send(err.errmsg);
// 	} else {
// 		res.json(pro)
// 	}
// }

provider
	.use(function (req, res, next) {
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		console.log(chalk.white.bgMagenta('Client IP: '), ip);		
		console.log(chalk.white.bgMagenta('METHOD: %s - URL: /api/Providers%s'), req.method, req.url);
		next();
	})
	// all Providers
	.get('/', function(req, res){
		Provider.find({}, function(err, pros){
			if (err){
				console.log(chalk.white.bgRed.bold(err))
				res.send(err);
			} else {
				res.json(pros);
			}
		})
	})
	// login provider
	.get('/:username', function(req, res){
		Provider.find({userName:req.params.username}, function(err, pro){
			if(err) {
				console.log(chalk.white.bgRed.bold(err))
				res.send('pro not found');
			} else {
				console.log("Provider.userName: %s\nProvider.password: %s", pro.userName, pro.password);
				res.json(pro);
			}
		})
	})
	// register new Provider
	.post('/', function(req, res){
		var newProvider = new Provider(req.body);
		Provider.find({email:req.body.email}, function(err, pro){
			if(pro.length !== 0){
				res.send('Error pro already exist')
			} else {
				Provider.create(newProvider, function(err, pro){
					if(err){
						console.log(chalk.white.bgRed.bold(err));
						res.send(err);
					} else {
						console.log("The new Provider has been saved!")
						res.json(pro)
					}
				})        
			}
		})
	})

	.delete('/delete/:admin', function(req, res) {
		if(req.params.admin === 'admin'){
			Provider.remove({}, function(err) {
				if(err){
					res.send('Error Deleting Providers ...! ')
				} else {
					res.send('Providers Deleted')
				}
			})
		}
	})

	//	assign a todo to all providers ** <TODO> ProviderSchema.pre('update' **
	.post('/todos', function(req, res){
		console.log("TODO req.body", req.body.todo._id)
		var todo = {
				"task": req.body.todo.task,	// "Mechanic-Auto",
				"city": req.body.todo.city,
				"date": "11/30/2016",
				"time": "12:30pm",	//"09:00",
				"description": req.body.todo.description,	//"Radiator broken",
				"status": {
						"available": true,		//	since anytime=true
						"confirmed": false,
						"receiver": "elsa",	//"username",
						"done": false
				}
		}

		console.log('todo.status.anytime: ' + todo.status.receiver);

		var query = {
			"services.anytime": true
			// "services.task": req.body.task,
			// "services.city" : req.body.city,
			// "services.dates": new Date(req.body.date)
		}
		// db.providers.update({userName: 'elsa'},{$pull:{'todos':{'status.available':true}}})
		// Provider.findOneAndUpdate({userName: req.body.userName}, { $push: { todos: todo} }, function(err, pro) {
		//	1. push todo to all Providers anytime = true
		Provider.update(query, { $push: { todos: todo} }, { multi: true }, function(err, pros) {
			if(err){
				console.log(chalk.white.bgRed.bold(err));
				res.send(err.errmsg)
			} else {
				console.log(chalk.green.bgWhite('Providers available=true:', pros));
			}
		})
		//	2. push todo to all Providers anytime = false
		todo.status.available = false;
		var query = {
			"services.anytime": false
			// "services.task": req.body.task,
			// "services.city" : req.body.city,
			// "services.dates": new Date(req.body.date),
		}		
		Provider.update(query, { $push: { todos: todo} }, { multi: true }, function(err, pros) {
			if(err){
				console.log(chalk.white.bgRed.bold(err));
				res.send(err.errmsg)
			} else {
				console.log(chalk.green.bgWhite('Providers available=false: ', pros));
			}
		})
		res.send('todo push to all providers')
	})
	//	get all availables Providers matching request and available = true
	//	by default all Providers services.anythime = true have todos.status.available = true
	.get('/all/availables', function(req, res) {
		var qry = {
			'todos.status.available': true,
			'todos.task': { $regex: new RegExp(req.query.task, 'i') },
			'todos.city' : { $regex: new RegExp(req.query.city, 'i') },
			'todos.date': new Date(req.query.date),
		}
			//req.query.date --> also works
			// 'services.dates': { $gte: new Date(req.query.date), $lte: new Date(req.query.date)},
		Provider.find()
			.where(qry)
			.exec(function(err, pros){
				if(err){
					console.log(chalk.white.bgRed.bold(err));
					res.send(err.errmsg);
				} else {
					res.json(pros)
				}
		})
	})
	//	http://stackoverflow.com/questions/15691224/mongoose-update-values-in-array-of-objects
	//	mark Provider todo.available to true
	.put('/todo/select', function(req, res){
		var query = {
			// 'userName' : { $regex: new RegExp(req.params.username, 'i') },
			'userName' : { $regex: new RegExp(req.body.username, 'i') },
			'todos.task': { $regex: new RegExp(req.body.task, 'i') },
			'todos.city' : { $regex: new RegExp(req.body.city, 'i') },
			'todos.date': new Date(req.body.date), //req.query.date --> also works
		}

		console.log('query ', query)
		Provider.findOneAndUpdate(	
			//{'todos._id': mongoose.Types.ObjectId(req.body.id)}, //	important !! unless is send with _id from client
			query,
			{$set:{'todos.$.status.available': true} },
			function(err, pro) {
				if(err){
					console.log(chalk.white.bgRed.bold(err));
					res.send(err.errmsg)
				} else {
					res.send('Provider username ' + pro + ' Todo available') ;
				}
			}
		)
	})

	.put('/todo/confirm', function(req, res){
		var query = {
			// 'userName' : { $regex: new RegExp(req.params.username, 'i') },
			'userName' : { $regex: new RegExp(req.body.username, 'i') },
			'todos.task': { $regex: new RegExp(req.body.task, 'i') },
			'todos.city' : { $regex: new RegExp(req.body.city, 'i') },
			'todos.date': new Date(req.body.date), //req.query.date --> also works
		}
		Provider.findOneAndUpdate(	
			//{'todos._id': mongoose.Types.ObjectId(req.body.id)}, //	important !! unless is send with _id from client
			query,
			{$set:{'todos.$.status.confirmed': true} },
			function(err, pro) {
				if(err){
					console.log(chalk.white.bgRed.bold(err));
					res.send(err.errmsg)
				} else {
					res.send('Provider userName ' + pro + ' Todo Confirmed') ;
				}
		})
	})


module.exports = provider;