exports.voiceHelpers = {
	speakWithAmber: (twiml, keys) =>{
		console.log('test speakWithAmber')
		console.log(twiml)
		twiml.say({ voice: 'woman'}, 'You have selected to chat with Amber! One moment while I patch you through.');
    twiml.dial(keys.personal.contact);
	},
	leaveVoiceMessage: (twiml) => {
	},
	getSMSSchedule: (twiml, callFrom, callID) => {
		twiml.say({ voice: 'woman'},
    'Amber\'s schedule will be messaged to you momentarily.' +
    'Goodbye!' );
  	twiml.redirect(`/sms/schedule/${callFrom}/${callID}`);
	},
	getSMSCompliment: (twiml, callFrom, callID) => {
		twiml.say({ voice: 'woman'},
    'A randomly generated compliment will be messaged to you momentarily.' +
    'Goodbye!');
	  twiml.redirect(`/sms/compliment/${callFrom}/${callID}`);
	}
}
