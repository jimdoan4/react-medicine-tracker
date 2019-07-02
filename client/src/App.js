import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import UserAccount from './components/UserAccount';
import Users from './components/Users';
import NewAccount from './components/NewAccount';

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Navbar />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/users/:userId/" component={UserAccount} />
						<Route exact path="/newaccount/" component={NewAccount} />
						<Route exact path="/users/" component={Users} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
