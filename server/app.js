const express = require('express');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());

app.use(express.json()); // body parser

app.use(express.static('./public'));

app.use('/api', router);

app.use(errorHandler);

module.exports = app;