require("dotenv").config();
const express = require('express');
const router  = express.Router();

const keys          = require("../keys.js");
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const accountSid    = keys.twilio.accountSid;
const authToken     = keys.twilio.authToken;
const client        = require('twilio')(accountSid, authToken);

client.calls
      .create({
         url: 'http://demo.twilio.com/docs/voice.xml',
         to: '+14154299564',
         from: '+14158180341'
       })
      .then(call => console.log(call.sid))
      .done();