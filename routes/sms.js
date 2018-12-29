require("dotenv").config();
const express = require('express');
const router  = express.Router();
const nicejob = require('nicejob');

// const keys          = require("../keys.js");
// const accountSid    = keys.twilio.accountSid;
// const authToken     = keys.twilio.authToken;
// const client        = require('twilio')(accountSid, authToken);

/* Programable SMS. */
router.post('/', function(req, res, next) {
  // res.send('respond with a resource');
});

module.exports = router;
