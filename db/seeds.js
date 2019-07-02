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
	photoUrl: 'https://photo.venus.com/im/17078926.jpg?preset=product',
	age: 19,
	location: 'Morrow, Georgia',
	bio: 'I just graduated from GA Tech am ready to start dating again. I love cats and coding Java on a daily basis',
	medicines: [ medicine ],

});


User.deleteMany({})
	.then(() => jim.save())
	.then(() => console.log('Successful Save'))
	.then(() => mongoose.connection.close());
