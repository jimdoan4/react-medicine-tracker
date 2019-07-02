import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

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
		if (this.state.redirectToUser) {
			return <Redirect to={`/users/:userId`} />;
		}

		return (
			<div>
				{this.state.users.map((user) => {
					return <div />;
				})}
				<br />
				<br />
				<button
					style={{
						backgroundColor: 'grey',
						borderColor: 'black',
						color: 'white',
						paddingLeft: '60px',
						paddingRight: '60px',
						paddingTop: '10px',
						paddingBottom: '10px'
					}}
					onClick={this.toggleEditForm}
				>
					Straight Women
				</button>
				{this.state.displayUserForm ? (
					<div className="container">
						<Card
							className="container"
							style={{
								width: '36rem',
								height: '41.4rem',
								paddingTop: '35px',
								marginTop: '20px',
								marginBottom: '98px'
							}}
						>
							<Form
								className="text-center"
								style={{ display: 'inline-block', paddingRight: '23px' }}
								onSubmit={this.handleSignUp}
							>
								<Form.Row>
									<Form.Group as={Col} controlId="formGridEmail">
										<Form.Label style={{ fontSize: '16px ' }} htmlFor="firstName">
											First Name
										</Form.Label>
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
										<Form.Label style={{ fontSize: '16px ' }} htmlFor="lastName">
											Last Name
										</Form.Label>
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

								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label style={{ fontSize: '16px ' }} htmlFor="photoUrl">
										Photo
									</Form.Label>
									<Form.Control
										className="text-center"
										name="photoUrl"
										onChange={this.handleChange}
										value={this.state.newUser.photoUrl}
										type="text"
										placeholder="Enter a Photo of Yourself"
									/>
								</Form.Group>

								<Form.Group controlId="formGridAddress1">
									<Form.Label style={{ fontSize: '16px ' }} htmlFor="age">
										Age
									</Form.Label>
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
									<Form.Label style={{ fontSize: '16px ' }} htmlFor="location">
										Location
									</Form.Label>
									<Form.Control
										className="text-center"
										name="location"
										type="text"
										onChange={this.handleChange}
										value={this.state.newUser.location}
										placeholder="Apartment, studio, or floor"
									/>
								</Form.Group>

								<Form.Row>
									<Form.Group as={Col} controlId="formGridCity">
										<Form.Label style={{ fontSize: '16px ' }} htmlFor="bio">
											Biography
										</Form.Label>
										<Form.Control
											className="text-center"
											name="bio"
											type="text"
											onChange={this.handleChange}
											value={this.state.newUser.bio}
											placeholder="Enter Facts about yourself"
										/>
									</Form.Group>
								</Form.Row>

								<div style={{ marginLeft: '140px' }} className="text-center">
									<Button
										onclick={this.createUser}
										className="text-center rockstar"
										type="submit"
										style={{
											marginRight: '140px',
											paddingLeft: '30px',
											paddingRight: '30px',
											marginTop: '29px',
											marginBottom: '65px',
											backgroundColor: 'grey',
											borderColor: 'black',
											color: 'black'
										}}
									>
										Register
									</Button>
								</div>
							</Form>
						</Card>
					</div>
				) : null}
			</div>
		);
	}
}
