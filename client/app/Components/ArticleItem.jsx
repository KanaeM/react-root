import React, { Component } from 'react';

class ArticleItem extends Component {
	
	constructor(props){

		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(event) {
		console.log('event ArticleItem', event.target.id)
		var article = {
			NYTTitle: this.props.article.headline.main,
			NYTDate: this.props.article.pub_date,
			NYTUrl: this.props.article.web_url,
			NYTId: event.target.id
		}
		console.log(article);
		this.props.saveArticle(article)
	}

	render() {
		console.log('ArticleItem', this.props);
		const { article } = this.props;

		return (
				<div className="panel panel-default">
					<div className="panel-body text-center">
						<h6 className="panel-title text-center">{article.headline.main}</h6>
						<p>{article.pub_date}</p>
						<a href={article.web_url}>{article.web_url}</a>
						<button type="button" onClick={this.handleClick} id={article._id} className="btn btn-info">save</button>
					</div>
				</div>
		);
	}
}

export default ArticleItem;