const express = require('express');
const router  = express.Router();
const nicejob = require('nicejob');
const keys    = require("../utils/keys.js");

const accountSid = keys.twilio.accountSid;
const authToken  = keys.twilio.authToken;
const client     = require('twilio')(accountSid, authToken);

// SMS Routes ======================================================

/*
  route: /sms/calendar/number
  recieve a link to Amber's calendar through text
*/
router.post('/calendar/:number/:id', (req, res, next) => {
  const toTxt       = req.params.number;
  const currentCall = req.params.id;
  const calendar    = keys.personal.calendar;

  // end user's call after requesting calendar
  client.calls(currentCall)
  .update({
    status: 'completed',
  })
  .then(call=>console.log(call.direction))
  .catch(err=>console.log(err));

  client.messages
  .create({
    body: `Thank you for calling! Here is a link to Amber's calendar 📅: ${calendar}`,
     from: keys.twilio.contact,
     to: toTxt
  })
  .then(message => {
    res.status(200)
  })
  .done();
});

/*
  route: /sms/compliment/number
  recieve a random compliment through text
*/
router.post('/compliment/:number/:id', (req, res, next) => {
  const toTxt            = req.params.number;
  const currentCall      = req.params.id;
  const randomCompliment = nicejob();

  // end user's call after requesting a compliment
  client.calls(currentCall)
  .update({
    status: 'completed',
  })
  .then(call=>res.status(200))
  .catch(err=>console.log(err));

  client.messages
  .create({
    body: `Amber says "${randomCompliment}" 🙃`,
    from: keys.twilio.contact,
    to: toTxt
  })
  .then(message =>res.status(200))
  .catch(err=>console.log(err))
  .done();
});

module.exports = router;
