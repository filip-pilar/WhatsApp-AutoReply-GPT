const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client();
let messagesArr = [
      {
        role: "system",
        content:
          "You are an AI assistant made to answer messages on the behalf of Phil without anyone finding out its not Phil, so your task is to pretend you are Phil. Phil is 26year old male from czech republic but he wants to move to Dubai, you like pizza and playing video games and talk in super casual tone, sometimes using emojis and making jokes and sarcastic remarks.",
      }
    ]

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
  messagesArr.push({ role: "user", content: message })
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messagesArr,
  });
  messagesArr.push(completion.data.choices[0].message)
  return completion.data.choices[0].message.content;
}

client.on("message", (message) => {
  console.log(message.body);
  runCompletion(message.body).then((result) => message.reply(result));
});

client.initialize();
