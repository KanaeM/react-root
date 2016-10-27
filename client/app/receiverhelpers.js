// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

var authKey = 'b9f91d369ff59547cd47b931d8cbc56b:0:74623931';
var query 	= '';
var now = new Date();
var startDate 	= 20160101;	//now.setDate(now.getDate()-30);
var endDate		=  20160830; //now.setDate(now.getDate())

var NYTUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' + authKey + '&q=';

var helpers = {

	//Beginning log-in user fetch .. whether provider or receiver
	getUser: function(user, type){
		return axios.get('/api/' + type + '/' + user)
			.then(function(response){
				console.log(response.data[0])
				return response.data[0];
		})
	},

	//Gets all Providers
	getProvider: function(){
		console.log("Getting user info");
		return axios.get('api/providers')
			.then(function(response){
				console.log(response);
				return response;
			});
	},

	//This gets all receivers
	getReceiver: function(){
		console.log("Getting Receiver info helper");
		return axios.get('api/receivers')
			.then(function(response){
				console.log("response from helper", response)
				return response;
			});
	},

	//This will only get one receiver by it's username
	getOneRec: function(userName){
		console.log("one rec helper", userName);
		return axios.get('api/receivers/'+userName)
			.then(function(results){
				console.log("result of one rec helper", results)
				return results;
			});
	},

	//This adds a new receiver during "sign up"
	postReceiver: function(newReceiver){
		console.log("this is the new receiver", newReceiver);
		return axios.post('api/receivers', {receiver: newReceiver})
			.then(function(results){
				console.log("these are the results from helper",results);
				return results;
			})
	},

	//This adds a new request task on the receiver that matched the username provided
	postTask: function(newTask, userName){
		console.log('Task from helper', newTask);
		return axios.post('api/receivers/request/'+userName, {requests: newTask})
			.then(function(tasks){
				console.log("helper task", tasks);
				return tasks;
			})
	},

	//Post to all provider TO-DO's
	postTodo: function(newTodo){
		return axios.post('api/providers/todos', {todo: newTodo})
			.then(function(task){
				console.log("POST.TODO:", task);
				return task;
			})
	}

}

module.exports = helpers;
