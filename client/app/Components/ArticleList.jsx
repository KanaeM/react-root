import React, { Component } from 'react';
import ArticleItem from './ArticleItem';

class ArticleList extends Component {
	constructor(props){
		super(props);
	}

	render() {
		const { articles, saveArticle } = this.props;

		return (
			<div className="panel panel-default ArticleList">
				{
					articles.map((article, key) =>
						{ if(article.type_of_material === 'News')
								return <ArticleItem key={key} article={article} saveArticle={saveArticle}/>
						}
					)
				}
			</div>
		);
	}
}

export default ArticleList;

