require("dotenv").config();
const express = require('express');
const router  = express.Router();
const nicejob = require('nicejob');
const keys    = require("../utils/keys.js");
const client = require('twilio')(keys.twilio.accountSid, keys.twilio.authToken);

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