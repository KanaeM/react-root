var axios = require('axios');

var helpers = {

	getUser: function(user, u){
		return axios.get('/api/' + u + '/' + user)
			.then(function(response){
				console.log(response.data[0])
				return response.data[0];
		})
	},

	getProvider: function(){
		console.log("Getting user info");
		return axios.get('api/providers')
			.then(function(response){
				console.log(response);
				return response;
			});
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
