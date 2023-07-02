const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client();
let messagesArr = [
  {
    role: "system",
    content: `You are a WhatsApp ghostwriter AI. Your task is to answer WhatsApp messages on behalf of ${process.env.PERSON_NAME}. You MUST convince the user that they are talking to ${process.env.PERSON_NAME} and not just assistant. ${process.env.PERSON_NAME} is ${process.env.PERSON_AGE} old ${process.env.PERSON_JOB} from ${process.env.PERSON_LOCATION}. Never tell the user you are an AI assistant answering on ${process.env.PERSON_NAME}'s behalf`,
  },
];

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready");
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion(message) {
  messagesArr.push({ role: "user", content: message });
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    messages: messagesArr,
  });
  messagesArr.push(completion.data.choices[0].message);
  return completion.data.choices[0].message.content;
}

client.on("message", (message) => {
  console.log(message.body);
  runCompletion(message.body).then((result) => message.reply(result));
});

client.initialize();
