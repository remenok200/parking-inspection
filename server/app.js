const express = require('express');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
// const generateParkOfficers = require('./utils/generator');

const app = express();

require('./models/MongoDB');

app.use(cors());

app.use(express.json());

app.use(express.static('./public'));

// localhost:5001/api
app.use('/api', router);

app.use(errorHandler);

// You can turn on the generator for testing purposes [THEN REMOVE FROM HERE]

// generateParkOfficers(20, 20)
//   .then(() => {
//     console.log('Data generation completed');
//   })
//   .catch((error) => {
//     console.error('Error generating data:', error);
//   });

module.exports = app;