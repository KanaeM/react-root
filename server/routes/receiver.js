var Receiver = require('../../database/models/Receiver.js');
var receiver = require('express').Router();
var bodyParser = require('body-parser');
var chalk = require('chalk');

receiver
	.use(function (req, res, next) {
		console.log(chalk.white.bgMagenta('METHOD: %s - URL: /api/receiver%s'), req.method, req.url);
		next();
	})
	// all recivers
	.get('/', function(req, res){
		Receiver.find({}, function(err, recs){
			if (err){
				console.log(chalk.white.bgRed.bold(err))
				res.send(err);
			} else {
				res.json(recs);
			}
		})
	})
	// login receiver
	.get('/:username', function(req, res){
		Receiver.find({userName:req.params.username}, function(err, rec){
			if(err) {
				console.log(chalk.white.bgRed.bold(err))
				res.send('rec not found');
			} else {
				console.log("receiver.userName: %s\nreceiver.password: %s", rec.userName, rec.password);
				res.json(rec);
			}
		})
	})
	// register new receiver
	.post('/', function(req, res){
		var newReceiver = new Receiver(req.body);
		Receiver.find({email:req.body.email}, function(err, rec){
			if(rec.length !== 0){
				res.send('Error Rec already exist')
			} else {
				Receiver.create(newReceiver, function(err, rec){
					if(err){
						console.log(chalk.white.bgRed.bold(err));
						res.send(err);
					} else {
						console.log("The new receiver has been saved!")
						res.json(rec)
					}
				})        
			}
		})
	})

	.delete('/delete/:admin', function(req, res) {
		if(req.params.admin === 'admin'){
			Receiver.remove({}, function(err) {
				if(err){
					res.send('Error Deleting Receivers ...! ')
				} else {
					res.send('Receivers Deleted')
				}
			})
		}
	})

	//  This will push a request to receiver ONLY if he's login
	//  ** <TODO> ** check if request already exist ..
	.post('/request/:username', function(req, res){
		Receiver.findOneAndUpdate({email: req.params.username}, {
			$push: {
				"request": {
					task: req.body.task,
					city: req.body.city,
					date: req.body.date, 
					time: req.body.time,
					description: req.body.description
				}
			}
			}, {safe:true, upsert:true, new:true}, function(err, rec){
				if (err){
					console.log(chalk.white.bgRed.bold(err));
					res.send(err);
				} else {
					console.log("the request push to: ", rec);
					res.json(rec)
				}
		})
	})
	//	updates request.status.confirmed = true and request.status.userName = username
	.put('/request/:id', function(req, res){
		Receiver.findOneAndUpdate(
			{_id: req.params.id},
			{$set:{
				'requests.$.status.confirmed': true,
				'requests.$.status.provider': req.body.username
			} },
			function(err, pro) {
				if(err){
					console.log(chalk.white.bgRed.bold(err));
					res.send(err.errmsg)
				} else {
					res.send('Provider userName ' + pro + ' Todo Selected') ;
				}
			}
		)
	})

	//	gets all requests
	.get('/request/:username', function(req, res){
		Receiver.findAll()
			.where({ userName: req.params.username })
			.exec(function(err, rec){
				if(err){
					console.log(chalk.white.bgRed.bold(err));
					res.send(err.errmsg);
				} else {
					res.json(rec.requests);
				}
			})
	})

module.exports = receiver;