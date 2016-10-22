import React, { Component } from 'react';

class History extends Component {

  constructor(props){
    super(props);
  }

  render() {
    var {savedArticles} = this.props
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Artciles Currently Saved</h3>
        </div>
        {
          savedArticles.map((article, key) =>
          {
            return (
              <div key={key} className="panel-body text-center">
                <h6 className="panel-title text-center">{article.NYTTitle}</h6>
                <p>{article.NYTDate}</p>
                <a href={article.NYTUrl}>{article.NYTUrl}</a>
              </div>
              )
          }
        )}
        </div>

    )
  }
}

module.exports = History;
