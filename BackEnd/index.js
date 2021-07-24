"use strict";
import express, { response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config.js";
import db from "./db.js";
import Message from "./Models/message.js";
import Channel from "./Models/channel.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { spawn } from "child_process";
import SerpApi from "google-search-results-nodejs";
const search = new SerpApi.GoogleSearch(config.serp_api);

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
  Channel.find({}, (err, channelNames) => {
    if (err) {
      console.log(err);
      res.status(400).json(err.message);
    } else {
      res.status(200).send(channelNames);
    }
  });
});

app.post("/getchanneldetails", (req, res) => {
  var { id } = req.body;
  console.log(id);
  Channel.find({ _id: id }, (err, foundChannels) => {
    if (err) {
      console.log(err);
      res.status(400).json(err.message);
    } else {
      if (foundChannels.length > 0) {
        Message.find(
          { _id: foundChannels[0].messages },
          (err, foundMessages) => {
            if (err) {
              console.log(err);
              res.status(400).json(err.message);
            } else {
              res.json({
                foundMessages,
                foundChannels,
              });
            }
          }
        );
      } else {
        res.status(400).json("No Channel found");
      }
    }
  });
});

app.post("/addmessage", (req, res) => {
  var str = req.body.message;
  var channelId = req.body.channel_id;
  var userId = req.body.user_id;
  var userName = req.body.user_name;
  console.log(str, channelId, userId);
  var message = new Message({
    message: str,
    user_id: userId,
    user_name: userName,
  });
  console.log(message);
  message.save((err, doneMessage) => {
    if (err) {
      console.log(err);
      res.status(400).json(err.message);
    } else {
      Channel.findOne({ _id: channelId }, (err, found) => {
        found.messages.push(message);
        found.save((err, doneChannel) => {
          if (err) {
            console.log(err);
            res.status(400).json(err.message);
          } else {
            Message.find({ _id: found.messages }, (err, chats) => {
              if (err) {
                console.log(err);
                res.status(400).json(err.message);
              } else {
                res.send(chats);
              }
            });
          }
        });
      });
    }
  });
});

app.post("/keyword", (req, res) => {
  var str = req.body.str;
  let out = "";

  console.log(str);

  var py = spawn("python", ["pyScript/nlpModel.py"]),
    data = str;

  // Python output
  py.stdout.on("data", function (output) {
    out += output.toString();
  });

  // Python Output display
  py.stdout.on("end", function () {
    out = JSON.parse(out);

    res.send(out);
  });

  // Python data input
  py.stdin.write(JSON.stringify(data));

  py.stdin.end();
});

const getKeyWords = (res, messageObject) => {
  var str = messageObject.message;
  var messageID = messageObject._id;

  let out = "";

  console.log(str, messageID);

  var py = spawn("python", ["pyScript/nlpModel.py"]),
    data = str;

  // Python output
  py.stdout.on("data", function (output) {
    out += output.toString();
    console.log("Output:", output);
  });

  // Python Output display
  py.stdout.on("end", function () {
    console.log(out);
    // out = JSON.parse(out);

    Message.findOne({ _id: messageID }, (err, found) => {
      out.map((word) => found.keywords.push(word));
      found.save((err, keywordsAdded) => {
        if (err) {
          console.log(err);
        } else {
          googleSearch(res, out);
        }
      });
    });

    // googleSearch(res, out);
    // res.send(out);
  });

  // Python data input
  py.stdin.write(JSON.stringify(data));

  py.stdin.end();
};

const googleSearch = (res, str) => {
  // res.send(str);
  search.json(
    {
      q: str.join(" "),
      location: "india",
    },
    (result) => {
      console.log(result.shopping_results[0].link);
      res.send(result.shopping_results[0].link);
    }
  );
};

app.post("/x", (req, res) => {
  var str = req.body.str;
  search.json(
    {
      q: str,
      location: "india",
    },
    (result) => {
      console.log(result.shopping_results[0].link);
      res.send(result.shopping_results[0].link);
    }
  );
});

app.listen(config.port, () => {
  console.log(`App is listening to ${config.port}`);
});
