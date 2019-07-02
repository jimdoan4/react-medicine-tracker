import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export default class UserPage extends Component {
	state = {
		userId: this.props.userId,
		users: [],
		user: {
			firstName: '',
			lastName: '',
			age: '',
			location: '',
			medicines: []
		},

		redirectToUser: false,
		displayUserForm: false
	};

	getSingleUserData = () => {
		axios.get(`/api/users/${this.state.userId}`).then((res) => {
			this.setState({ user: res.data });
		});
	};

	componentDidMount = () => {
		this.getSingleUserData();
	};

	toggleUserForm = () => {
		this.setState((state, props) => {
			return { displayUserForm: !state.displayUserForm };
		});
	};

	handleChange = (e) => {
		const updateUser = { ...this.state.user };
		updateUser[e.target.name] = e.target.value;
		this.setState({ user: updateUser });
	};

	handleChange = (e) => {
		const newUser = { ...this.state.user };
		newUser[e.target.name] = e.target.value;
		this.setState({ user: newUser });
	};

	updateUser = (e) => {
		e.preventDefault();
		axios
			.put(`/api/users/${this.state.userId}`, {
				firstName: this.state.user.firstName,
				lastName: this.state.user.lastName,
				age: this.state.user.age,
				location: this.state.user.location,
				medicines: {}
			})
			.then((res) => {
				this.setState({ user: res.data, displayUserForm: false });
			});
		this.getSingleUserData();
	};

	deleteUser = () => {
		axios.delete(`/api/users/${this.state.userId}`).then((res) => {
			this.setState({ redirectToUser: true });
		});
	};

	render() {
		if (this.state.redirectToUser) {
			return <Redirect to={`/users/`} />;
		}
		return (
			<div>
				<div>
				
					<h3 style={{ marginTop: '30px' }}>YOUR ACCOUNT</h3>
				</div>

					<Form className="text-center" onSubmit={this.updateUser}>
							<Form.Row>
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label htmlFor="firstName">First Name</Form.Label>
									<Form.Control
										className="text-center"
										id="firstName"
										name="firstName"
										onChange={this.handleChange}
										value={this.state.user.firstName}
										type="text"
										placeholder="Enter First Name"
									/>
								</Form.Group>

								<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label htmlFor="lastName">Last Name</Form.Label>
									<Form.Control
										className="text-center"
										id="lasttName"
										name="lastName"
										onChange={this.handleChange}
										value={this.state.user.lastName}
										type="text"
										placeholder="Enter Last Name"
									/>
								</Form.Group>
							</Form.Row>

							<Form.Group controlId="formGridAddress1">
								<Form.Label htmlFor="age">Age</Form.Label>
								<Form.Control
									className="text-center"
									id="age"
									name="age"
									type="text"
									onChange={this.handleChange}
									value={this.state.user.age}
									placeholder="Enter your Age"
								/>
							</Form.Group>

							<Form.Group controlId="formGridAddress2">
								<Form.Label htmlFor="location">Location</Form.Label>
								<Form.Control
									className="text-center"
									id="location"
									name="location"
									type="text"
									onChange={this.handleChange}
									value={this.state.user.location}
									placeholder="Apartment, studio, or floor"
								/>
							</Form.Group>

							<div style={{ justifyContent: 'center' }} className="text-center">
								<Button className="text-center" type="submit">
									Update Account
								</Button>
									<Button className="" onClick={this.deleteUser}>
									Delete Account
								</Button>
							</div>
						</Form>
			
			</div>
		);
	}
}
