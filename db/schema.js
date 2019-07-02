const mongoose = require('../db/connection.js');
const Schema = mongoose.Schema;

const MedicineSchema = new Schema({
	name: String,
	dosage: String,
	refill: String
});



const UserSchema = new Schema({
	firstName: String,
	lastName: String,
	age: Number,
	location: String,
	medicines: [ MedicineSchema ]

});





module.exports = {
	UserSchema: UserSchema,
	MedicineSchema: MedicineSchema,

	
};
