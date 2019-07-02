require('dotenv').config();
const mongoose = require('mongoose');

const User = require('../models/User.js');
const Medicine = require('../models/Medicine.js');

const adderall = new Medicine({
	name: "Adderall",
	dosage: "30mg",
	refill: "Yes"

});


const jim = new User({
	firstName: 'Pam',
	lastName: 'Anderson',
	age: 19,
	location: 'Morrow, Georgia',
	medicines: [ medicine ],

});


User.deleteMany({})
	.then(() => jim.save())
	.then(() => console.log('Successful Save'))
	.then(() => mongoose.connection.close());
