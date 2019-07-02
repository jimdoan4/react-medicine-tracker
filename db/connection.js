require('dotenv').config();
const mongoose = require('mongoose');

if(process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect('mongodb://localhost/react-medicine-tracker', { useNewUrlParser: true })
}

mongoose.connection.once('open', () => {
	console.log(`Mongoose has connected to MongoDB`);
});

mongoose.connection.on('error', (error) => {
	console.error(`MongoDB connection error!!! ${error}`);
	process.exit(-1);
});

module.exports = mongoose;
