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

// defining the Express app
const app = express();

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
app.use(bodyParser.json());


// defining an endpoint to return all events
app.get('/events', (req, res) => {
    // res.send(events);
    const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_API_ID}/Event?view=Grid%20view&api_key=${process.env.AIRTABLE_API_KEY}`;

    console.log(`Fetching ${url}`);

    request({ url, json: true }, (err, response, body) => {
        if (!err) {
            let newArray = body.records.map(obj => obj.fields);
            //slugify title ... it will add new field slug with SEO optimized name
            newArray = newArray.filter(d => d.title);
            console.log('after filter');
            console.log(newArray);
            newArray.forEach((project) => {
                const d = project;
                d.slug = slug(d.title, { lower: true });
            });

            res.send(newArray);
        } else {
            res.status(500).send({ error: err });
        }
    });

});

// defining an endpoint to return all events
app.get('/events/:eventid', (req, res) => {

  //  "https://api.airtable.com/v0/" + app_id + "/Event?filterByFormula=ID_=" + id
  const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_API_ID}/Event?filterByFormula=ID_=${req.params.eventid}&api_key=${process.env.AIRTABLE_API_KEY}`;

  console.log(`Fetching ${url}`);

  request({ url, json: true }, (err, response, body) => {
      if (!err) {
          let newArray = body.records.map(obj => obj.fields);
          //slugify title ... it will add new field slug with SEO optimized name
          newArray = newArray.filter(d => d.title);
          console.log('after filter');
          console.log(newArray);
          newArray.forEach((project) => {
              const d = project;
              d.slug = slug(d.title, { lower: true });
          });

          res.send(newArray);
      } else {
          res.status(500).send({ error: err });
      }
  });
   // res.send(`GET HTTP method on event/${req.params.eventid} resource`);
});

// defining an endpoint to return all events
app.get('/', (req, res) => {
    res.send('no action define here');
});

/*
// replace the endpoint responsible for the GET requests
app.get('/', async (req, res) => {
  res.send(await getAds());
});

*/

// starting the server
app.listen(process.env.PORT, () => {
    console.log('listening on port 3001');
});