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

export default class Navbar extends Component {
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
								<a class="nav-link" href="/users/:userId/">
									MEMBER ACCOUNT
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="/contact/">
									CONTACT
								</a>
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
