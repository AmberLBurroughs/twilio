require("dotenv").config();
var express = require('express');
var router = express.Router();
// const keys          = require("../keys.js");
// const accountSid    = keys.twilio.accountSid;
// const authToken     = keys.twilio.authToken;
// const client        = require('twilio')(accountSid, authToken);

/* Programable SMS. */
router.post('/', function(req, res, next) {
  // res.send('respond with a resource');
});

module.exports = router;
