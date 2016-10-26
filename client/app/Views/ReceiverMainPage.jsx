import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import ReceiverInfoTest from '../Components/ReceiverInfoTest'
import CurrentRequest from '../Components/CurrentRequest'
import FinishedRequest from '../Components/FinishedRequest'

//Style for MaterialUI Tabs
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class ReceiverMainPage extends Component {

	constructor(props){
		super(props);
		// this.getUserData=this.getUserData.bind(this)
		this.state={
			show:false,
			firstName: '',
			lastName: '',
			email: ''
		}
	}

	render(){
		const {user, login, url} = this.props

		if(url !== 'receivers'){
			return(
				<div className='jumbotron'>
					<h2>Welcome to the Receiver Page</h2>
					<p>Please log in or sign up to use this page</p>
				</div>
			)
		}else{
			if(login) {
				return(
					<div>
						<h2>Welcome {user.userName}</h2>
						<br />
				    <Tabs>
				    	<Tab label="Current Requests" >
				      	<div>
				        	<CurrentRequest  user={user}/>
				     		</div>
				    	</Tab>
				    	<Tab label="Fulfilled Request" >
				      	<div>
				       		<FinishedRequest user={user} />
				      	</div>
				    	</Tab>
				    <Tab label="Add New Task">
				      <div>
				        <ReceiverInfoTest user={user}/>
				      </div>
				    </Tab>
				  </Tabs>
		      </div>
				)
				} else {

					return (<ReceiverInfoTest user={user}/>)
					
				}				
		}
	}
}

export default ReceiverMainPage;