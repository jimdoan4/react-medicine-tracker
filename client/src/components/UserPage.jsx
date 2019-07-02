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
					<Card className="">
						<Card>
							<Card.Title>{this.state.user.firstName}</Card.Title>
							<Card.Title>{this.state.user.lastName}</Card.Title>
							<Card.Title>{this.state.user.age}</Card.Title>
							<Card.Title>{this.state.user.location}</Card.Title>

							<Container>
								<button className="" onClick={this.toggleUserForm}>
									Edit Account
								</button>

								<button className="" onClick={this.deleteUser}>
									Delete Account
								</button>
							</Container>
						</Card>
					</Card>
				</div>

				{this.state.displayUserForm ? (
					<form onSubmit={this.updateUser} className="col text-center">
						<div className="col text-center">
							<div className="col s12 m6 text-center">
								<label htmlFor="firstName">First Name </label>
								<p />
								<input
									className="text-center"
									id="firstName"
									type="text"
									name="firstName"
									onChange={this.handleChange}
									value={this.state.user.firstName}
								/>
							</div>
							<div className="col s12 m6 text-center">
								<label htmlFor="lastName">Last Name </label>
								<input
									className="text-center"
									id="lastName"
									type="text"
									name="lastName"
									onChange={this.handleChange}
									value={this.state.user.lastName}
								/>
							</div>
							<div className="col s12 m6 text-center">
								<label htmlFor="age">Age </label>
								<input
									className="text-center"
									id="age"
									type="number"
									name="age"
									onChange={this.handleChange}
									value={this.state.user.age}
								/>
							</div>

							<div className="col s12 m6 text-center">
								<label htmlFor="location">Location </label>
								<input
									className="text-center"
									id="location"
									type="text"
									name="location"
									onChange={this.handleChange}
									value={this.state.user.location}
								/>
							</div>
						</div>
						<div className="text-center">
							<button className="text-center ">Submit</button>
						</div>
					</form>
				) : null}
			</div>
		);
	}
}
