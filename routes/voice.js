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
  const twiml  = new VoiceResponse();
  const gather = twiml.gather({
    numDigits: 1,
    action: '/voice/gather',
  });

  gather.say({ voice: 'woman'}, 'Hi there! You must be calling about Amber\'s Hatch application, \n she will be very excited to hear from you.\n'+
    '\n To speak with Amber, \n press 1 \n'+
    '\n To leave a voice message, \n press 2 \n'+
    '\n To receive a link to Amber\'s calendar, \n press 3 \n'+
    '\n To receive a random compliment, \n press 4.');

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

  const callID = request.body.CallSid;

  // Use the Twilio Node.js SDK to build an XML response
  const twiml  = new VoiceResponse();

  // If the user entered digits, process their request
  if (request.body.Digits) {
    switch (request.body.Digits) {
      // press '1' to speak to Amber
      case '1':
        helpers.voiceHelpers.speakWithAmber(twiml, keys);
        break
      // press '2' to leave a voice mail
      case '2':
        helpers.voiceHelpers.leaveVoiceMessage(twiml);
        break
      // press '3' to get SMS of calendar
      case '3':
        helpers.voiceHelpers.getSMSCalendar(twiml, callFrom, callID);
        break
      // press '4' to get SMS of a random compliment
      case '4':
        helpers.voiceHelpers.getSMSCompliment(twiml, callFrom, callID);
        break
      // error handle for any other (or no) key press
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
  route: /voice/handle_recording
  end user's call after creating voice recording
  * recording is accessible through twilio console
*/
router.post('/handle_recording', (request, response) => {
  const twiml = new VoiceResponse();
  twiml.say({ voice: 'woman'},'Thank you, \n Goodbye.');

  response.type('text/xml');
  response.send(twiml.toString());
});

module.exports = router;
