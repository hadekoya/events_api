// ./src/index.js

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv').config();


// defining the Express app
const app = express();

// defining an array to work as the database (temporary solution)
const events = [
    {title: 'Hello, world (again)!'}
  ];

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all events
app.get('/', (req, res) => {
    res.send(events);
});

// defining an endpoint to return all events
app.get('/events/:eventid', (req, res) => {
    res.send(`GET HTTP method on event/${req.params.eventid} resource`);
});

/*
// replace the endpoint responsible for the GET requests
app.get('/', async (req, res) => {
  res.send(await getAds());
});

*/

// starting the server
app.listen(3001, () => {
    console.log('listening on port 3001');
});