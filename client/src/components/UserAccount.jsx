import React, { Component } from 'react';
import UserPage from './UserPage';
import MedicinePage from './MedicinePage';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

export default class UserAccount extends Component {
	state = {
		userId: this.props.match.params.userId
	};

	render() {
		return (
			<Container className="text-center">
				<Row style={{ display: 'flex' }}>
					<Col>
						<UserPage userId={this.state.userId} />
					</Col>

					<Col>
						<MedicinePage userId={this.state.userId} />
					</Col>
				</Row>
			</Container>
		);
	}
}
