import React, { Component, cloneElement } from 'react';
import Search from '../Components/Search';
import ArticleList from '../Components/ArticleList';

class SearchPage extends Component {

	constructor(props){
		super(props);
	}

	render() {
		console.log('Search Page', this.props);
		const {articles, setSearch, saveArticle} = this.props;
		return (
			<div className="SearchPage text-center">
				<div className="row">
					<h4>News Finder! SearchPage</h4>
				</div>
				<div className="row">
					<Search setSearch={setSearch}/>
				</div>
				<ArticleList articles={articles} saveArticle={saveArticle}/>
			</div>
		);

	}
}

export default SearchPage;
