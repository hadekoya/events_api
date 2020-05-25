// ./src/index.js

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const request = require('request');
const slug = require('slug');
const { check, validationResult } = require('express-validator');
const routes = require('./routes');

// defining the Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// adding Helmet to enhance your API's security
app.use(helmet());
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
// enabling CORS for all requests
app.use(cors());
// adding morgan to log HTTP requests
app.use(morgan('combined'));
// allows CORS
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization,user-agent');
    next();
});

app.use('/', routes);

// starting the server
app.listen(process.env.PORT, () => {
    console.log(`Lstening on port  ${process.env.PORT}`);
});