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

export default class NewAccount extends Component {
	state = {
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

	createUser = (e) => {
		axios
			.post('/api/users/', {
				firstName: this.state.newUser.firstName,
				lastName: this.state.newUser.lastName,
				age: this.state.newUser.age,
				location: this.state.newUser.location,
				medicines: []
			})
			.then((res) => {
				const usersList = [ this.state.users ];
				usersList.unshift(res.data);
				this.setState({
					newUser: {
						firstName: '',
						lastName: '',
						age: '',
						location: '',
						medicines: {}
					},
					displayUserForm: false,
					users: usersList
				});
			});
		this.findAllUsers();
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
		// if (this.state.redirectToUser) {
		// 	return <Redirect to={`/users/:userId`} />;
		// }

		return (
			<div>


				<div className="container">
					<Card className="jumbotron">
						<Form className="text-center" onSubmit={this.handleSignUp}>
							<Form.Row>
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label htmlFor="firstName">First Name</Form.Label>
									<Form.Control
										className="text-center"
										name="firstName"
										onChange={this.handleChange}
										value={this.state.newUser.firstName}
										type="text"
										placeholder="Enter First Name"
									/>
								</Form.Group>

								<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label htmlFor="lastName">Last Name</Form.Label>
									<Form.Control
										className="text-center"
										name="lastName"
										onChange={this.handleChange}
										value={this.state.newUser.lastName}
										type="text"
										placeholder="Enter Last Name"
									/>
								</Form.Group>
							</Form.Row>

							<Form.Group controlId="formGridAddress1">
								<Form.Label htmlFor="age">Age</Form.Label>
								<Form.Control
									className="text-center"
									name="age"
									type="text"
									onChange={this.handleChange}
									value={this.state.newUser.age}
									placeholder="Enter your Age"
								/>
							</Form.Group>

							<Form.Group controlId="formGridAddress2">
								<Form.Label htmlFor="location">Location</Form.Label>
								<Form.Control
									className="text-center"
									name="location"
									type="text"
									onChange={this.handleChange}
									value={this.state.newUser.location}
									placeholder="Apartment, studio, or floor"
								/>
							</Form.Group>

							<div style={{ justifyContent: 'center' }} className="text-center">
								<Button onclick={this.createUser} className="text-center" type="submit">
									Register
								</Button>
							</div>
						</Form>
					</Card>
				</div>
			</div>
            
		);
	}
}
