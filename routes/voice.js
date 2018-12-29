require("dotenv").config();
const express = require('express');
const router  = express.Router();

const keys          = require("../keys.js");
const VoiceResponse = require('twilio').twiml.VoiceResponse;
// const accountSid    = keys.twilio.accountSid;
// const authToken     = keys.twilio.authToken;
// const client        = require('twilio')(accountSid, authToken);


router.post('/', (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  console.log("caller data", request.body);

  const twiml = new VoiceResponse();
  twiml.say({ voice: 'Amber' }, 'hello world!');

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});


module.exports = router;

