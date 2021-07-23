"use strict";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config.js";
import db from "./db.js";
import Message from "./Models/message.js";
import Channel from "./Models/channel.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post("/addchannel", (req, res) => {
  var name = req.body.channelName;
  var channel = new Channel({
    channelName: name,
  });
  channel.save((err, newChannel) => {
    if (err) {
      console.log(err);
      res.status(400).json(err.message);
    } else {
      console.log(newChannel);
      res.status(200).send(newChannel);
    }
  });
});

app.get("/getchannel", (req, res) => {
  Channel.find(
    {},
    { channelName: 1, _id: 1, messages: 0 },
    (err, channelNames) => {
      if (err) {
        console.log(err);
        res.status(400).json(err.message);
      } else {
        console.log(newChannel);
        res.status(200).send(channelNames);
      }
    }
  );
});

app.post("/getchanneldetails", (req, res) => {
  var { id } = req.body;
  Channel.find({ _id: id }, (err, foundChannels) => {
    if (err) {
      console.log(err);
      res.status(400).json(err.message);
    } else {
      res.status(200).send(foundChannels);
    }
  });
});

app.post("/addmessage", (req, res) => {
  var message = req.body.message;
  var channelId = req.body.channel_id;
  var userId = req.body.user_id;
  var keywords = ["xyz", "abc"];

  var message = new Message({
    message: message,
    keywords: keywords,
    user: userId,
  });

  Channel.findOne({ _id: channelId }, (err, found) => {
    found.messages.push(message);
    found.save((err, done) => {
      if (err) {
        console.log(err);
        res.status(400).json(err.message);
      } else {
        res.send(done);
      }
    });
  });
});

// app.get("/temp", (req, res) => {
//   const tempMessage = {
//     message: "Hello Buddy",
//     keywords: "Buddy",
//     user: "Parva",
//   };
//   const message = new Message(tempMessage);
//   message.save((err, newMessage) => {
//     if (err) {
//       console.log(err);
//       res.status(400).json(err.message);
//     } else {
//       console.log(newMessage);
//       res.status(200).send(newMessage);
//     }
//   });
// });

app.get("/addchannel", (req, res) => {
  const tempMessage1 = {
    message: "Hello Parva Buddy",
    keywords: "Buddy",
    user: "Parva",
  };
  const message = new Message(tempMessage1);
  const tempChannel = {
    channelName: "Hackrx2.0",
    messages: [message],
  };
  const channel = new Channel(tempChannel);
  channel.save((err, newChannel) => {
    if (err) {
      console.log(err);
      res.status(400).json(err.message);
    } else {
      console.log(newChannel);
      res.status(200).send(newChannel);
    }
  });
});

app.listen(config.port, () => {
  console.log(`App is listening to ${config.port}`);
});
