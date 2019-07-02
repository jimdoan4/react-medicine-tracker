import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

export default class MedicinePage extends Component {
	state = {
		userId: this.props.userId,
		medicineId: this.props.medicineId,
		medicines: [],
		newMedicine: {
			name: '',
			dosage: '',
			refill: ''
		},
		redirectToMedicine: false,
		displayEditForm: false,
		displayMedicineForm: false
	};

	getAllMedicines = () => {
		axios.get(`/api/users/${this.state.userId}/medicines`).then((res) => {
			console.log(res.data);
			this.setState({ medicines: res.data });
		});
	};

	componentDidMount = () => {
		this.getAllMedicines();
	};

	toggleEditForm = () => {
		this.setState((state, props) => {
			return { displayEditForm: !state.displayEditForm };
		});
	};

	toggleMedicineForm = () => {
		this.setState((state, props) => {
			return { displayMedicineForm: !state.displayMedicineForm };
		});
	};

	handleChange = (e) => {
		const changeNewMedicine = { ...this.state.newMedicine };
		changeNewMedicine[e.target.name] = e.target.value;
		this.setState({ newMedicine: changeNewMedicine });
	};

	createMedicine = (e) => {
		e.preventDefault();
		axios
			.post(`/api/users/${this.state.userId}/medicines`, {
				name: this.state.newMedicine.name,
				dosage: this.state.newMedicine.dosage,
				refill: this.state.newMedicine.refill
			})
			.then((res) => {
				const medicinesList = [ ...this.state.medicines ];
				medicinesList.unshift(res.data);
				this.setState({
					newMedicine: {
						name: '',
						dosage: '',
						refill: ''
					},
					displayMedicineForm: false,
					medicines: medicinesList
				});
			});
		this.getAllMedicines();
	};

	handleChange = (e) => {
		const changedMedicine = { ...this.state.newMedicine };
		changedMedicine[e.target.name] = e.target.value;
		this.setState({ newMedicine: changedMedicine });
	};

	updateMedicine = (e) => {
		e.preventDefault();
		axios
			.put(`/api/users/${this.state.userId}/medicines`, {
				name: this.state.newMedicine.name,
				dosage: this.state.newMedicine.dosage,
				refill: this.state.newMedicine.refill
			})
			.then((res) => {
				this.setState({ user: res.data, displayEditForm: false });
			});
		this.getAllMedicines();
	};

	deleteMedicine = (e, medicine) => {
		e.preventDefault();
		axios.delete(`/api/users/${this.state.userId}/medicines/${medicine._id}`).then((res) => {
			this.getAllMedicines();
		});
	};

	render() {
		if (this.state.redirectToUser) {
			return <Redirect to={`/users/`} />;
		}
		return (
			<div className="text-center">
				<h3 style={{ marginTop: '30px' }}>PRESCRIPTIONS</h3>
			
				<div className="">
					{this.state.medicines.map((medicine) => {
						return (
							<div>
							
									<div className="text-center">
										<p>Name: {medicine.name}</p>
										<p>Dosage: {medicine.dosage}</p>
										<p>Refill: {medicine.refill}</p>

										<Container style={{ textAlign: 'center' }} className="text-center">
											{/* <Link
												to={`/users/${this.state.userId}/medicines/${medicine._id}`}
												key={medicine._id}
											> */}
												<button>Update Prescription</button>
											{/* </Link> */}
											<button
												key={medicine._id}
												onClick={(e) => this.deleteMedicine(e, medicine)}
											>
												Delete Prescription
											</button>
										</Container>
									</div>
							
							</div>
						);
					})}

					<div className="text-center col" style={{ marginTop: '30px' }}>
						<button onClick={this.toggleEditForm}>Add a Prescription</button>
						{this.state.displayEditForm ? (
							<div className="container text-center">
								<Card className="jumbotron">
									<Form className="text-center" onSubmit={this.createMedicine}>
										<Form.Row>
											<Form.Group as={Col} controlId="formGridEmail">
												<Form.Label htmlFor="name"> Name</Form.Label>
												<Form.Control
													className="text-center"
													type="text"
													name="name"
													onChange={this.handleChange}
													value={this.state.newMedicine.name}
													placeholder="Enter Name of Prescription"
												/>
											</Form.Group>
										</Form.Row>
										<Form.Row>
											<Form.Group as={Col} controlId="formGridPassword">
												<Form.Label htmlFor="dosage">Dosage</Form.Label>
												<Form.Control
													className="text-center"
													type="text"
													name="dosage"
													onChange={this.handleChange}
													value={this.state.newMedicine.dosage}
													placeholder="Enter Dosage"
												/>
											</Form.Group>
										</Form.Row>
										<Form.Row>
											<Form.Group as={Col} controlId="formGridPassword">
												<Form.Label htmlFor="refill">Refill</Form.Label>
												<Form.Control
													className="text-center"
													type="text"
													name="refill"
													onChange={this.handleChange}
													value={this.state.newMedicine.refill}
													placeholder="Refill Option"
												/>
											</Form.Group>
										</Form.Row>

										<Container
											style={{ marginLeft: '15px', textAlign: 'center' }}
											className="text-center"
										>
											<button className="text-center" variant="primary" type="submit">
												Add Prescription
											</button>
										</Container>
									</Form>
								</Card>
							</div>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}
