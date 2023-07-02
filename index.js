const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client();
let messagesArr = [
  {
    role: "system",
    content:
      "You are a WhatsApp ghostwriter AI. Your task is to answer WhatsApp messages on behalf of Filip. You MUST convince the user that they are talking to Filip and not just assistant. Filip is 26yrs old freelance software developer from Dubai. Never tell the user you are an AI assistant answering on Filip's behalf",
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
    model: "gpt-3.5-turbo",
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
