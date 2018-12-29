const express 			= require('express');
const router  			= express.Router();
const VoiceResponse = require('twilio').twiml.VoiceResponse;

router.post('/', (request, response) => {

  const callFrom = request.body.From;
  
  const twiml  = new VoiceResponse();
  const gather = twiml.gather({
    numDigits: 1,
    action: '/voice/gather',
  });
  gather.say({ voice: 'woman', }, 'Hi, thank you for calling about Amber\'s hatch application. To speak with Amber, press 1. To leave a voice message, press 2. To receive a link to Amber\'s schedule, press 3. To receive a random compliment, press 4.');

  // If the user doesn't enter input, loop
  twiml.redirect('/voice');

  response.type('text/xml');
  response.send(twiml.toString());
});

router.post('/gather', (request, response) => {

	console.log("caller data testttt", request.body);

  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();
  // If the user entered digits, process their request
  if (request.body.Digits) {
    switch (request.body.Digits) {
      case '1':
        twiml.say('You selected speaks with Amber. Good for you!');
        break;
      case '2':
        twiml.say('You want to leave a voice message!');
        break;
      case '3':
        twiml.say('Send you Amber\'s schedule!');
        break;
      case '4':
        twiml.say('Have a happy New Year!');
        break;
      default:
        twiml.say("Sorry, I don't understand that choice.").pause();
        twiml.redirect('/voice');
        break;
    }
  } else {
    // If no input was sent, redirect to the /voice route
    twiml.redirect('/voice');
  }

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});


module.exports = router;

