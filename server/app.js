const express = require('express');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

require('./models/MongoDB');

app.use(cors());

app.use(express.json());

app.use(express.static('./public'));

// localhost:5001/api
app.use('/api', router);

app.use(errorHandler);

module.exports = app;