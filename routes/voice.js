const express 			= require('express');
const router  			= express.Router();
const VoiceResponse = require('twilio').twiml.VoiceResponse;

router.post('/', (request, response) => {

  const callFrom = request.body.From;

  const twiml = new VoiceResponse();
  twiml.say({ voice: 'alice', }, 'hello world!');
  response.type('text/xml');
  response.send(twiml.toString());
});


module.exports = router;

