

const express = require('express');
const router  = express.Router();

const VoiceResponse = require('twilio').twiml.VoiceResponse;
// const accountSid    = '';
// const authToken     = '';
const client        = require('twilio')(accountSid, authToken);

/* programable SMS. */
router.get('/message', function(req, res, next) {
  //res.send('respond with a resource');
});

/* programable voice. */
router.get('/voice', function(req, res, next) {
  //res.send('respond with a resource');
});

module.exports = router;

