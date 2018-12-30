require("dotenv").config();
const keys          = require("../utils/keys.js");
const helpers       = require("../utils/voice-helpers.js");
const express       = require('express');
const router        = express.Router();
const VoiceResponse = require('twilio').twiml.VoiceResponse;

// Voice Routes ======================================================

/*
  route: /voice
  incoming calls
*/
router.post('/', (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  console.log(request.body);
  const twiml  = new VoiceResponse();
  const gather = twiml.gather({
    numDigits: 1,
    action: '/voice/gather',
  });

  gather.say({ voice: 'woman'}, 'Hi there! You must be calling about Amber\'s Hatch application, she will be very excited to hear from you.\n'+
    'To speak with Amber, press 1 \n'+
    'To leave a voice message, press 2 \n'+
    'To receive a link to Amber\'s schedule, press 3 \n'+
    'To receive a random compliment, press 4.');

  // If the user doesn't enter input, loop
  twiml.redirect('/voice');

  response.type('text/xml');
  response.send(twiml.toString());
});

/*
  route: /voice/gather
  decision making after a user dials a digit
*/
router.post('/gather', (request, response) => {
  let callFrom = request.body.From;
  callFrom     = callFrom.replace(/[^0-9]/g, "");

  // Use the Twilio Node.js SDK to build an XML response
  const twiml  = new VoiceResponse();

  // If the user entered digits, process their request
  if (request.body.Digits) {
    switch (request.body.Digits) {
      case '1':
        helpers.voiceHelpers.speakWithAmber(twiml, keys);
        break
      case '2':
        helpers.voiceHelpers.leaveVoiceMessage(twiml);
        break
      case '3':
        helpers.voiceHelpers.getSMSSchedule(twiml, callFrom);
        break
      case '4':
        helpers.voiceHelpers.getSMSCompliment(twiml, callFrom);
        break
      default:
        twiml.say({ voice: 'woman'}, "Sorry, I don't understand that choice.").pause();
        twiml.redirect('/voice');
        break;
    }
  }
  else {
    // If no input was sent, redirect to the /voice route
    twiml.redirect('/voice');
  }

  // Render the response as XML in reply to the webhook request
  twiml.hangup();
  response.type('text/xml');
  response.send(twiml.toString());
});

/*
  route: /voice/handle_transcribe
  after creating a voice recording
*/
router.post('/handle_transcribe', (request, response) => {
  const twiml = new VoiceResponse();
  // const recordingUrl = request.body.RecordingUrl;
  // twiml.play(recordingUrl);
  twiml.say({ voice: 'woman'},'Thank you, Goodbye.');
  response.type('text/xml');
  response.send(twiml.toString());
});

module.exports = router;
