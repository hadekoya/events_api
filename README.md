# Node/ Express Server for airtable powered REST API 

A reverse proxy REST API to Airtable API using Node/Express 

## Features
* Environment Variables
* Express
* REST API

## Requirements

* [node & npm](https://nodejs.org/en/)
* Express
* Slug

## Installation

* `git clone https://github.com/hadekoya/events_api.git`
* `cd events_api`
* `npm install`
* `npm start`
* include *.env* in your *.gitignore*

### GET Routes

* visit http://localhost:3000
  * /event
  * /events/1

### Try it out

#### View with Postman

* Install [Postman](https://www.getpostman.com/apps) to interact with REST API
* Create a message with:
  * URL: http://localhost:3000/events/1
  * Method: GET

#### View live on codesandbox.io

* View all events (up to 100): https://n9yvq.sse.codesandbox.io/events
* View events by ID: https://n9yvq.sse.codesandbox.io/events/1
