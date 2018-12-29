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
  twiml.say('Please leave a message at the beep.\nPress the star key when finished.');
  twiml.record({
    transcribe: true,
    transcribeCallback: '/voice/handle_transcribe',
    maxLength: 20,
    finishOnKey: '*'
  });
  twiml.say('I did not receive a recording');
}

getSMSSchedule = (callFrom) => {
  const twiml = new VoiceResponse();
  twiml.say({ voice: 'woman'}, 
    'Amber\'s schedule will be messaged to you momentarily.' + 
    'Goodbye!' );
  twiml.redirect(`/sms/schedule/${callFrom}`);
  twiml.hangup();
}

getSMSCompliment = (callFrom) => {
  const twiml = new VoiceResponse();
  twiml.say({ voice: 'woman'}, 
    'A random compliment will be messaged to you momentarily.' + 
    'Goodbye!');
  twiml.redirect(`/sms/compliment/${callFrom}`);
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
	let callFrom = request.body.From;
  callFrom     = callFrom.replace(/[^0-9]/g, "");
  
  // If the user entered digits, process their request
  if (request.body.Digits) {
    switch (request.body.Digits) {
      case '1':
        return speakWithAmber();
      case '2':
        return leaveVoiceMessage();
      case '3':
        return getSMSSchedule(callFrom);
      case '4':
        return getSMSCompliment(callFrom);
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

router.post('/handle_transcribe', (request, response) => {
  console.log("recording transcribe", request.body);
});

module.exports = router;


