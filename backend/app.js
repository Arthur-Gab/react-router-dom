const express = require('express');
const cors = require('cors');
const eventRoutes = require('./routes/events');

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:3838',
	})
);

// (req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// }

app.use('/events', eventRoutes);

app.use((error, req, res, next) => {
	const status = error.status || 500;
	const message = error.message || 'Something went wrong.';
	res.status(status).json({ message: message });
});

app.listen(8080, () => {
	console.log('🏃‍♂️ on port 8080');
});
