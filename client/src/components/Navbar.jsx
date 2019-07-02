import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Jumbotron } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { CardGroup } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import Users from './Users';

export default class Navbar extends Component {
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
		return (
			<section id="nav-bar">
				<nav class="navbar navbar-expand-lg navbar-light">
					<a class="navbar-brand" href="#">
						<img src="" />
					</a>
					<button
						class="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon" />
					</button>
					<div class="collapse navbar-collapse" id="navbarNav">
						<ul class="navbar-nav ml-auto">
							<li class="nav-item">
								<a class="nav-link" href="/">
									HOME
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="/plans/">
									SHOP PLANS
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="/services/">
									DOCTORS & LOCATIONS
								</a>
							</li>
                            	<li class="nav-item">
								<a class="nav-link" href="/contact/">
									CONTACT
								</a>
							</li>
				
                            <li class="nav-item text-center">
						<div class="dropdown">
                        <button class="dropbtn">MEMBER ACCOUNT</button>
                        <div class="dropdown-content text-center">
                   
                               <Col>
                                <Row>
                                        <Users userId={this.state.userId} />
                             
                               </Row>  
                                </Col>   
                                                
                            </div>
</div>    
</li>

							<li class="nav-item">
								<a class="nav-link" href="/newaccount/">
									SIGN IN
								</a>
							</li>
						</ul>
					</div>
				</nav>
			</section>
		);
	}
}
