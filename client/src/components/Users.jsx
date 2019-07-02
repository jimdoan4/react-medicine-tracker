import React, { Component } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { Redirect, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

export default class Users extends Component {
	state = {
        userId: this.props.userId,
		users: [],
		newUser: {
			firstName: '',
			lastName: '',
			age: '',
			location: '',
			medicines: []
		},
		displayUserForm: false,
		redirectToUser: false
	};

	componentDidMount = () => {
		this.findAllUsers();
	};

	findAllUsers = () => {
		axios.get('/api/users/').then((res) => {
			this.setState({ users: res.data });
		});
	};

	

	handleChange = (e) => {
		const changeNewUser = { ...this.state.newUser };
		changeNewUser[e.target.name] = e.target.value;
		this.setState({ newUser: changeNewUser });
	};

	toggleEditForm = () => {
		this.setState((state, props) => {
			return { displayUserForm: !state.displayUserForm };
		});
	};

	handleSignUp = (e) => {
		e.preventDefault();
		this.createUser();
	};

	render() {


		return (
			<div>
				{this.state.users.map((user) => {
                    return (
                 		<div className="text-center">
									<Link
									
										to={`/users/${user._id}`}
										key={user._id}
									>
										{user.firstName}
									</Link>
	
						</div>
                    );
              })}
				
				</div>
		
		);
	}
}
