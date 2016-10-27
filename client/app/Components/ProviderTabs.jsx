import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {greenA100, greenA400} from 'material-ui/styles/colors';
import ProviderTabQueue from '../Components/ProviderTabQueue';
import ProviderTabPending from '../Components/ProviderTabPending';
import ProviderTabCompleted from '../Components/ProviderTabCompleted';


const styles = {
	headline: {
		fontSize: 17,
		paddingTop: 10,
		marginBottom: 10,
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
		todos: ''
		}
	}

	updateUserTodos(todos) {


	}

  componentWillMount() {
    this.state.todos = this.props.user.todos

  }

	handleTabActive(tab) {
		// alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
		console.log(`A tab with this route property ${tab.props['data-route']} was activated.`);
	}

	render() {
		// const { login, user } = this.props;
		const { login, user } = this.props;
		// const { todos } = this.state;
		return (

			<Tabs style= {styles.tabs}>
				<Tab label='Tasks Queue' style={styles.queue} data-route='queue' onActive={this.handleTabActive} >
					<div className="text-center">
						<ProviderTabQueue login={login} user={user} />
					</div>
				</Tab>
				<Tab label='Tasks Pending' style={styles.pending} data-route='pending' onActive={this.handleTabActive} >
					<div className="text-center">
						<h2 style={styles.headline}>Pending Task ...</h2>
						<ProviderTabPending login={login} user={user} />
					</div>
				</Tab>
				<Tab label='Tasks Completed' style={styles.completed} data-route='completed' onActive={this.handleTabActive} >
					<div className="text-center">
						<h2 style={styles.headline}>Completed Tasks ...</h2>
						<ProviderTabCompleted login={login} user={user} />
					</div>
				</Tab>
			</Tabs>

		)
	}
}

export default ProviderTabs;