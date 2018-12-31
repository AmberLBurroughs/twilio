# 📱 Twilio Interactive Voice Response API

Instead of just giving out my contact number, I used Twilio to create creative and interactive way to get in touch with me. When the twilio webhook is hit, the caller is prompted with 4 options to chose from:

	 1. Speak with me
	 2. Leave a voicemail
	 3. Receive a link to my schedule through text
	 4. Receive a random compliment through text

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### ✅ Prerequisites

What things you need installed before running this application.

* [NODE](https://nodejs.org/en/download/)
* [NPM](https://docs.npmjs.com/cli/install)

Create a `.env` file for your twilio keys and personal information
```
# Twilio keys

TWILIO_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_TOKEN=your_auth_token
TWILIO_NUM=15555555555

# Personal Data

AMBER_CONTACT=10000000000
AMBER_SCHEDULE=https://somecalendarlinkhere.com
```

*If using Heroku for deploying set environmental variables*

`heroku config:set {TWILIO_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX} {TWILIO_TOKEN=your_auth_token} {TWILIO_NUM=15555555555} {AMBER_CONTACT=10000000000} {AMBER_SCHEDULE=https://somecalendarlinkhere.com}`

🌟 You will also need to have a Twilio account set up.
* [Twilio](https://www.twilio.com/try-twilio)



## 🛠️ Built With
* [Node](https://nodejs.org/en/docs/) - open source server environment
* [Express](https://www.npmjs.com/package/express) - Node web framework
* [Twilio](https://www.twilio.com/docs/) - Cmmunication API
* [nicejob](https://www.npmjs.com/package/nicejob) - Random compliment generator


