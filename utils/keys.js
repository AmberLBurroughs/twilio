exports.twilio = {
  accountSid: process.env.TWILIO_SID,
  authToken: process.env.TWILIO_TOKEN,
  contact: process.env.TWILIO_NUM
};

exports.personal = {
	contact: process.env.AMBER_CONTACT,
	schedule: process.env.AMBER_SCHEDULE
};