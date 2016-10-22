// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

var authKey = 'b9f91d369ff59547cd47b931d8cbc56b:0:74623931';
var query 	= '';
var now = new Date();
var startDate 	= 20160101;	//now.setDate(now.getDate()-30);
var endDate		=  20160830; //now.setDate(now.getDate())

var NYTUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' + authKey + '&q=';

var helpers = {

	getUser: function(user, type){
		return axios.get('/api/' + type + '/' + user)
			.then(function(response){
				console.log(response.data[0])
				return response.data[0];
		})
	},


	fetchArticles: function(search){
		console.log('fetchArticles', );
		query = NYTUrl + search;
		// query = query + "&begin_date=" + startDate  + '&end_date=' + endDate + '&sort=newest&type=article';

		return axios.get(query)
			.then(function(response){
				console.log(response);
				return response.data.response.docs;
		})

	},
	// This function send a request to drop Article collection from DB
	
	dropArticle: function(){
		console.log('Send Request to drop Article Collection');
		return axios.delete('/api/articles')
			.then(function(response){
				console.log(response);
				return response;
			});
	},
	
	// This function retrieves saved articles
	getArticle: function(){
		console.log('getArticle');
		return axios.get('/api/articles')
			.then(function(response){
				console.log(response);
				return response;
			});
	},

	// This function posts new articles to mongodb
	postArticle: function(article){
		console.log('axios', article);
		return axios.post('/api/articles', {article: article})
			.then(function(results){
				console.log("saved to MongoDB");
				return(results);
			})
	}

}

module.exports = helpers;
