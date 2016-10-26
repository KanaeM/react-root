import React from 'react';
import { Route, IndexRoute } from 'react-router';


import SearchPage from './Views/SearchPage';
import SavedPage from './Views/SavedPage';
import MaterialPage from './Views/MaterialPage';
import ModalPage from './Views/ModalPage';

import Application from './Components/Application';
import MainPage from './Views/MainPage';
import ReceiverMainPage from './Views/ReceiverMainPage';
import UserDataPage from './Views/UserDataPage';
import EmployerDataPage from './Views/EmployerDataPage';
import ProviderPage from './Views/ProviderPage';


export default (
	<Route component={Application}>
		<Route path="/" component={MainPage}></Route>
		<Route path="search" component={SearchPage}></Route>
		<Route path="saved" component={SavedPage}></Route>
		<Route path="material" component={MaterialPage}></Route>
		<Route path="receivers" component={ReceiverMainPage}></Route>
		<Route path="userdata" component={UserDataPage}></Route>
		<Route path="employerdata" component={EmployerDataPage}></Route>
		<Route path="modal" component={ModalPage}></Route>
		<Route path="providers" component={ProviderPage}></Route>
	<IndexRoute component={MainPage}/>
	</Route>
);