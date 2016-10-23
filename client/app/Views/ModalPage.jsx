import React, { Component } from 'react';
import SingInModal from '../Components/SingInModal';

class ModalPage extends Component {
	
	render() {
		const {open} = this.props
		return (

			<div>
				<SingInModal open={open}/>
			</div>
			
		);
	}
}
export default ModalPage;