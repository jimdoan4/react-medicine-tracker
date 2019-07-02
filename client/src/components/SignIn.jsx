import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Jumbotron } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { CardGroup } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import Footer from './Footer';

export default class SignIn extends Component {
	state = {
		users: [],
		newUser: {
			_id: '',
			userName: '',
			password: '',
			firstName: '',
			lastName: '',
			age: '',
			location: '',
			medicines: []
		},
		redirectToUser: false,
		displayUserForm: false,
		userId: this.props.match.params.userId
	};

	componentDidMount = () => {
		this.findAllUsers();
	};

	findAllUsers = () => {
		axios.get('/api/users').then((res) => {
			this.setState({ users: res.data });
		});
	};

	createUser = (e) => {
		axios
			.post('/api/users', {
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
						comments: {},
						events: {}
					},
					displayUserForm: false,
					users: usersList
				});
			});
		this.findAllUsers();
	};

	deleteUser = (e, user) => {
		e.preventDefault();
		axios.delete(`/api/users/${user._id}`).then((res) => {
			this.findAllUsers();
		});
	};

	handleChange = (e) => {
		const changeNewUser = { ...this.state.newUser };
		changeNewUser[e.target.name] = e.target.value;
		this.setState({ newUser: changeNewUser });
	};

	toggleUserForm = () => {
		this.setState((state, props) => {
			return { displayUserForm: !state.displayUserForm };
		});
	};

	render() {
		if (this.state.redirectToUser) {
			return <Redirect to={`/users}`} />;
		}
		return (
			<div>
				<div
					className="row"
					style={{
						marginLeft: '30px',
						marginBottom: '30px',
						marginTop: '50px'
					}}
				>
					{this.state.users.map((user) => {
						return (
							<div
								className="row text-center"
								style={{
									marginLeft: '20px',
									marginBottom: '20px',
									marginTop: '30px'
								}}
							>
								<CardGroup>
									<Card
										key={user._id}
										className="text-center"
										style={{
											width: '16.8rem',
											marginLeft: '30px',
											marginRight: '30px',
											backgroundColor: '#efe8e8'
										}}
									>
										<Card.Img
											className="text-center zoom"
											style={{ height: '250px', width: '267px' }}
											variant="top"
											src={user.photoUrl}
										/>

										<Card.Body>
											<Card.Title style={{ color: 'black' }}>{user.firstName}</Card.Title>
											<Card.Title style={{ color: 'black' }}>{user.age}</Card.Title>
											<Card.Text style={{ color: 'black' }}>{user.location}</Card.Text>

											<div key={user._id}>
												<Link to={`/users/${user._id}`} key={user._id}>
													<button
														className="rockstar"
														style={{
															backgroundColor: 'white',
															borderColor: 'black',
															color: 'black',
															marginRight: '10px'
														}}
													>
														Interested
													</button>
												</Link>

												<button
													key={user._id}
													onClick={(e) => this.deleteUser(e, user)}
													type="button"
													className="rockstar"
													style={{
														backgroundColor: 'white',
														borderColor: 'black',
														color: 'black'
													}}
												>
													Not Interested
												</button>
											</div>
										</Card.Body>
									</Card>
								</CardGroup>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
