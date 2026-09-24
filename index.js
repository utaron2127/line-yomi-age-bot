const express = require("express");
const { middleware, Client } = require("@line/bot-sdk");

const app = express();

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

const client = new Client(config);

app.post("/webhook", middleware(config), async (req, res) => {
  try {
    const events = req.body.events;

    for (const event of events) {
      console.log("LINEから受信:", event);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  res.send("LINE読み上げBot 起動中！");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`サーバー起動: ${PORT}`);
});
