require("dotenv").config();
const keys          = require("../keys.js");
const express 			= require('express');
const router  			= express.Router();
const VoiceResponse = require('twilio').twiml.VoiceResponse;

speakWithAmber  => {
  const twiml = new VoiceResponse();
  twiml.say({ voice: 'woman'}, 'You selected speaks with Amber!');
  twiml.dial(keys.twilio.contact);
  twiml.say({ voice: 'woman'}, 'Goodbye!');
}

leaveVoiceMessage => {
  const twiml = new VoiceResponse();
  twiml.say({ voice: 'woman'}, 'You want to leave a voice message!');
  twiml.say({ voice: 'woman'}, 'Goodbye!');
}

getSchedule => {
  const twiml = new VoiceResponse();
  twiml.say({ voice: 'woman'}, 
    'Amber\'s schedule will be messaged to you momentarily.' + 
    'Goodbye!' );
  twiml.hangup();
}

getCompliment => {
  const twiml = new VoiceResponse();
  twiml.say({ voice: 'woman'}, 
    'A random compliment will be messaged to you momentarily.' + 
    'Goodbye!');
  twiml.hangup();
}



router.post('/', (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml  = new VoiceResponse();
  const gather = twiml.gather({
    numDigits: 1,
    action: '/voice/gather',
  });
  gather.say({ voice: 'woman'}, 'Hi there! You must be calling about Amber\'s Hatch application, she will be very excited to hear from you.'+ 
    'To speak with Amber, press 1.'+
    'To leave a voice message, press 2.'+
    'To receive a link to Amber\'s schedule, press 3.'+
    'To receive a random compliment, press 4.');

  // If the user doesn't enter input, loop
  twiml.redirect('/voice');

  response.type('text/xml');
  response.send(twiml.toString());
});

router.post('/gather', (request, response) => {

	const callFrom = request.body.From;

  // Use the Twilio Node.js SDK to build an XML response
  
  // If the user entered digits, process their request
  if (request.body.Digits) {
    switch (request.body.Digits) {
      case '1':
        return speakWithAmber();
      case '2':
        return leaveVoiceMessage();
      case '3':
        twiml.say({ voice: 'woman'}, 'Send you Amber\'s schedule!');
        break;
      case '4':
        twiml.say({ voice: 'woman'}, 'Have a happy New Year!');
        break;
      default:
        twiml.say({ voice: 'woman'}, "Sorry, I don't understand that choice.").pause();
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



