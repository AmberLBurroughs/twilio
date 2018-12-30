exports.voiceHelpers = {

  speakWithAmber: (twiml, keys) =>{
    twiml.say({ voice: 'woman'}, 'You have selected to chat with Amber! One moment while I patch you through');
    twiml.dial(keys.personal.contact);
  },

  leaveVoiceMessage: (twiml) => {
    twiml.say({ voice: 'woman'},'Please leave a message at the beep.\nPress the star key when finished');
    twiml.record({
      action: '/voice/handle_recording',
      finishOnKey: '*'
    });
    twiml.say({ voice: 'woman'}, 'I did not receive a recording');
  },

  getSMSCalendar: (twiml, callFrom, callID) => {
    twiml.say({ voice: 'woman'},
    'Amber\'s calendar will be messaged to you momentarily.' +
    'Goodbye!' );
    twiml.redirect(`/sms/calendar/${callFrom}/${callID}`);
  },

  getSMSCompliment: (twiml, callFrom, callID) => {
    twiml.say({ voice: 'woman'},
    'A randomly generated compliment will be messaged to you momentarily.' +
    'Goodbye!');
    twiml.redirect(`/sms/compliment/${callFrom}/${callID}`);
  }
}
