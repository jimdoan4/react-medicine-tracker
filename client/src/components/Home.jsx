import React, { Component } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { Redirect, Link } from 'react-router-dom';
import { Media } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export default class Home extends Component {
	render() {
		return (
			<div style={{ width: '100%' }}>
				<Container className="text-center" style={{ marginBottom: '20px', width: '100%' }}>
					<Row>
						<Card style={{ width: '100%' }}>
							<Image
								className="rockstar"
								src="http://corinnealexandra.com/wp-content/uploads/2017/03/kayli-michael.jpg"
							/>
						</Card>
					</Row>
				</Container>
				<Container>
					<Row className="two text-center" style={{ marginTop: '25px' }}>
						<Col style={{ fontSize: '31px', position: 'block' }}>Find your Match</Col>
						<Col style={{ fontSize: '31px', position: 'block' }}>Go on a Date with your Match</Col>
						<Col style={{ fontSize: '31px', position: 'block' }}>Rate your Date</Col>
					</Row>
					<Container className="text-center" style={{ marginTop: '40px' }}>
						<Link className="" to="/login/" style={{ color: 'black' }}>
							<button
								className="join rockstar"
								style={{
									backgroundColor: 'grey',
									borderColor: 'white',
									color: 'white',
									marginRight: '10px',
									paddingLeft: '50px',
									paddingRight: '50px',
									paddingTop: '15px',
									paddingBottom: '15px'
								}}
							>
								Join Now
							</button>
						</Link>
					</Container>
				</Container>
			</div>
		);
	}
}
