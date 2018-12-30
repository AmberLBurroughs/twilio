require("dotenv").config();
const express = require('express');
const router  = express.Router();
const nicejob = require('nicejob');
const keys    = require("../utils/keys.js");

const accountSid = keys.twilio.accountSid;
const authToken  = keys.twilio.authToken;
const client     = require('twilio')('ACa20365eb7b6017bd1e4b7f38cb0a437b', 'fe30b9b49c07a75a2818473469ab821c');

// SMS Routes ======================================================

/*
  /sms/schedule/number
  recieve a link to Amber's schedule through text
*/
router.get('/:schedule/:number', function(req, res, next) {
	const toTxt = req.params.number;
	const schedule = keys.personal.schedule;

  client.messages 
  .create({ 
  	body: `Thank you for calling! Here is a link to Amber's schedule 📅: ${schedule}`,
    from: keys.twilio.contact,       
    to: toTxt
  }) 
  .then(message => res.status(200)) 
  .done();
});

/*
  /sms/compliment/number
  recieve a random compliment through text
*/
router.get('/:compliment/:number', function(req, res, next) {
	const randomCompliment = nicejob();
	const toTxt = req.params.number;

	client.messages 
  .create({ 
  	body: `Amber says "${randomCompliment}" 🙃`,
    from: keys.twilio.contact,       
    to: toTxt
  }) 
  .then(message => res.status(200)) 
  .done();
});

module.exports = router;