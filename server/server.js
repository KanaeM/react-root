var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var chalk = require('chalk');

// request api routes
var provider = require('./routes/provider');
var receiver = require('./routes/receiver');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// using static files instead app.use(express.static('./public'))
app.use(express.static(__dirname + '/../client/public/'));

/***********
 * ROUTES *
 ***********/
app.use('/api/providers', provider);
app.use('/api/receivers', receiver);
// catch 404 (Not Found) 
app.use(function(req, res, next) {
	var err = new Error('Path Not Found');
	err.status = 404;
	next(err);	// forward to error handler
});

// error handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	// Send Error HTML
	res.send('<h4 style="color:red;">Error Code: ' + err.status + '<br><hr>' + err + ' ' + req.url + '</h4>');
	// Send Error JSON 
	// res.json({error:{
	// 	message: err.message,
	// 	status: err.status
	// }});
});


app.listen(PORT, function() {
	console.log(chalk.blue.bgWhite("Server listening on PORT: %s"), PORT);
});
