import React from 'react';

class Search extends React.Component{

	constructor(props){
		super(props);
		this.state.search = '';
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(event) {
		this.setState({search:event.target.value})
	}

	handleClick(){
		console.log('this.state.search', this.state.search);
		this.props.setSearch(this.state.search);
	}

	render() {

		return(
			<div className="col-sm-8 col-sm-offset2">
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title text-center">Search <strong>News</strong> ...!</h3>
					</div>
					<div className="panel-body text-center">
							<form>
								<div className="form-group">
									<input type="text" className="form-control text-center" onChange= {this.handleChange} required/>
									<br />
									<button type="button" className="btn btn-primary" onClick={this.handleClick}>Submit</button>
								</div>
							</form>
					</div>
				</div>
			</div>

		)
	}
}

export default Search;

