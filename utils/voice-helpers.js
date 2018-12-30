const axios = require('axios');

exports.voiceHelpers = {
	speakWithAmber: (twiml, keys) =>{
		console.log('test speakWithAmber')
		console.log(twiml)
		twiml.say({ voice: 'woman'}, 'You have selected to chat with Amber! One moment while I patch you through.');
    twiml.dial(keys.personal.contact);
	},
	leaveVoiceMessage: (twiml) => {
	},
	getSMSSchedule: (twiml, callFrom) => {
		twiml.say({ voice: 'woman'},
    'Amber\'s schedule will be messaged to you momentarily.' +
    'Goodbye!' );
  	axios.post(`/sms/schedule/${callFrom}`)
  	.then(response => console.log(response))
	  .catch(error => console.log(error));

  	twiml.hangup();
	},
	getSMSCompliment: (twiml, callFrom) => {
		twiml.say({ voice: 'woman'},
    'A random compliment will be messaged to you momentarily.' +
    'Goodbye!');
	  axios.post(`/sms/compliment/${callFrom}`)
	  .then(response => console.log(response))
	  .catch(error => console.log(error));

	  twiml.hangup();
	}
}
