import React, { Component } from 'react';
import ArticleList from '../Components/ArticleList';
import History from '../Components/History';

class SavedPage extends Component {
	
	constructor(props){
		super(props);
	}

	render() {
		console.log('Saved Page', this.props)
		const { changeShow, savedArticles } = this.props;

		return (
			<div className="SavedPage">
				<div className="row text-center">
					<h1>History Page</h1>
					<History savedArticles={savedArticles}/>
				</div>
			</div>
		);

	}
}

export default SavedPage;
