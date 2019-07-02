import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Jumbotron } from 'react-bootstrap';
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
			comments: [],
			events: []
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
				<div style={{ marginTop: '30px', marginBottom: '40px' }}>
					<Card className="" style={{ width: '28rem', marginBottom: '0px', backgroundColor: '#efe8e8' }}>
						<Card>
							<Card.Img className="zoom" variant="top" src={this.state.user.photoUrl} alt="top" />
							<Card.Body>
								<Card.Title>
									{this.state.user.firstName}
									&nbsp;
									{this.state.user.lastName}
								</Card.Title>
								<Card.Title>{this.state.user.age}</Card.Title>
								<Card.Title>{this.state.user.location}</Card.Title>
							</Card.Body>

							<Container style={{ textAlign: 'center', marginBottom: '30px', marginTop: '8px' }}>
								<button
									className="rockstar"
									onClick={this.toggleUserForm}
									style={{
										backgroundColor: 'white',
										borderColor: 'black',
										color: 'black',
										marginRight: '10px'
									}}
								>
									Edit Account
								</button>

								<button
									className="rockstar"
									style={{ backgroundColor: 'white', borderColor: 'black', color: 'black' }}
									onClick={this.deleteUser}
								>
									Delete Account
								</button>
							</Container>
						</Card>
					</Card>
				</div>

				{this.state.displayUserForm ? (
					<form
						style={{ marginTop: '30px', marginRight: '' }}
						onSubmit={this.updateUser}
						className="col text-center"
					>
						<div className="col text-center">
							<div className="col s12 m6 text-center">
								<label style={{ marginRight: '0px', marginTop: '30px' }} htmlFor="firstName">
									First Name{' '}
								</label>
								<p />
								<input
									style={{ height: '50px', width: '320px' }}
									className="text-center"
									id="firstName"
									type="text"
									name="firstName"
									onChange={this.handleChange}
									value={this.state.user.firstName}
								/>
							</div>
							<div className="col s12 m6 text-center">
								<label style={{ marginRight: '30px', marginTop: '40px' }} htmlFor="lastName">
									Last Name{' '}
								</label>
								<input
									style={{ height: '54px', width: '390px', marginRight: '53px' }}
									className="text-center"
									id="lastName"
									type="text"
									name="lastName"
									onChange={this.handleChange}
									value={this.state.user.lastName}
								/>
							</div>
							<div className="col s12 m6 text-center">
								<label style={{ marginRight: '30px', marginTop: '40px' }} htmlFor="age">
									Age{' '}
								</label>
								<input
									style={{ height: '54px', width: '390px', marginRight: '53px' }}
									className="text-center"
									id="age"
									type="number"
									name="age"
									onChange={this.handleChange}
									value={this.state.user.age}
								/>
							</div>
							<div className="col s12 m6 text-center">
								<label style={{ marginRight: '30px', marginTop: '40px' }} htmlFor="bio">
									Biography
								</label>
								<input
									style={{ height: '54px', width: '390px', marginRight: '53px' }}
									className="text-center"
									id="bio"
									type="text"
									name="bio"
									onChange={this.handleChange}
									value={this.state.user.bio}
								/>
							</div>
							<div className="col s12 m6 text-center">
								<label style={{ marginRight: '30px', marginTop: '40px' }} htmlFor="location">
									Location{' '}
								</label>
								<input
									style={{ height: '54px', width: '390px', marginRight: '53px' }}
									className="text-center"
									id="location"
									type="text"
									name="location"
									onChange={this.handleChange}
									value={this.state.user.location}
								/>
							</div>
							<div className="col s12 m6 text-center">
								<label style={{ marginRight: '30px', marginTop: '40px' }} htmlFor="photoUrl">
									Photo{' '}
								</label>
								<input
									style={{ height: '54px', width: '390px', marginRight: '53px' }}
									className="text-center"
									id="photoUrl"
									type="text"
									name="photoUrl"
									onChange={this.handleChange}
									value={this.state.user.photoUrl}
								/>
							</div>
						</div>
						<div className="text-center" style={{ marginTop: '20px' }}>
							<button
								style={{
									backgroundColor: 'white',
									borderColor: 'black',
									color: 'black'
								}}
								className="text-center rockstar"
							>
								Submit
							</button>
						</div>
					</form>
				) : null}
			</div>
		);
	}
}
