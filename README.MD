# WhatsApp Ghostwriter AI

This is a WhatsApp bot powered by OpenAI's GPT-3.5-turbo-16k model. This model can handle a context of up to 16,000 tokens (approximately 11,000 words), allowing for extended conversation sessions. 

The bot is designed to reply to WhatsApp messages on behalf of a predefined person, aiming to convince users that they are communicating with that person directly.

## Setup

1. Clone the repository.
2. Install dependencies by running `npm install`.
3. Set up your OpenAI API key and the personal details (name, age, job, and location) of the person the bot is to impersonate in the `.env` file:

`PENAI_API_KEY=your_api_key`
`PERSON_NAME=person's_name`
`PERSON_AGE=person's_age`
`PERSON_JOB=person's_job`
`PERSON_LOCATION=person's_location`

## Dependencies

- openai
- whatsapp-web.js
- qrcode-terminal
- dotenv

## How it works

1. A WhatsApp client is created using the `whatsapp-web.js` library.
2. A QR code is generated which you can scan with your device to connect the bot to your WhatsApp account.
3. Whenever a message is received, it's sent to the OpenAI API, which generates an AI-driven response. This response is then sent back as a reply.

Please note that, to maintain the illusion that users are interacting with the person defined in system prompt and not an AI, the bot is explicitly designed not to reveal that it is an AI assistant.

## Model Information

The bot uses the `gpt-3.5-turbo-16k` model from OpenAI. This model can handle a maximum context length of 16,000 tokens (approximately 11,000 words), providing a large memory capacity for the bot's conversational context.

