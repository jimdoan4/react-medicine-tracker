const express = require('express');
const logger = require('morgan');
const app = express();
const routes = require('./routes/index');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/client/build'));

app.use('/api/', routes);

app.get('/*', (req, res) => {
	res.sendFile(__dirname + '/client/build/index.html');
});
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log('App is up and running on port ' + PORT);
});

