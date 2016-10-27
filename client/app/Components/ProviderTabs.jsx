import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {greenA100, greenA400} from 'material-ui/styles/colors';
import ProviderTabQueue from '../Components/ProviderTabQueue';

const styles = {
	headline: {
		fontSize: 17,
		paddingTop: 10,
		marginBottom: 12,
		fontWeight: 400,
	},
	tabs: {
		width: '100%',
	},
	queue:{
		color: greenA100,
		fontSize: 25
	},
	pending:{
		color: greenA400,
		fontSize: 25
	},
	completed:{
		color: greenA100,
		fontSize: 25
	}	
};

class ProviderTabs extends React.Component {

	constructor(props){
	super(props);
	this.handleTabActive = this.handleTabActive.bind(this);

	this.state = {
		loading: false,
		finished: false,
		stepIndex: 0,
		}

	}


	handleTabActive(tab) {
		// alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
		console.log(`A tab with this route property ${tab.props['data-route']} was activated.`);
	}

	render() {
		const { login, user } = this.props;

		return (

	<Tabs style= {styles.tabs}>
		<Tab label='Tasks Queue' style={styles.queue} data-route='queue' onActive={this.handleTabActive} >
			<div>
				<ProviderTabQueue login={login} user={user} />
			</div>
		</Tab>
		<Tab label='Tasks Pending' style={styles.pending} data-route='pending' onActive={this.handleTabActive} >
			<div>
				<h2 style={styles.headline}>Tab Two</h2>
				<p>
					This is another example tab.
				</p>
			</div>
		</Tab>
		<Tab label='Tasks Completed' style={styles.completed} data-route='completed' onActive={this.handleTabActive} >
			<div>
				<h2 style={styles.headline}>Tab Three</h2>
				<p>
					This is a third example tab.
				</p>
			</div>
		</Tab>
	</Tabs>

			)
	}
}

export default ProviderTabs;