//import event from "./event";
const express = require('express');
const event = require('./event');

const router = express.Router();

router.use('/events', event);

module.exports = router;
