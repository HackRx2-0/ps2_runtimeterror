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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Channel Routes
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

// Message Routes
app.post("/getchanneldetails", (req, res) => {
    var { id } = req.body;
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
    var message = new Message({
        message: str,
        user_id: userId,
        user_name: userName,
    });
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
    var py = spawn("python", ["pyScript/nlpModel.py"]),
        data = str;
    py.stdout.on("data", function (output) {
        out += output.toString();
    });

    py.stdout.on("end", function () {
        out = JSON.parse(out);
        var searchText = "";
        for (var x in out.keywords) {
            searchText += out.keywords[x] + " ";
        }
        search.json(
            {
                q: searchText,
                location: "india",
            },
            (result) => {
                console.log(result.shopping_results[0].link);
                var output = { link: result.shopping_results[0].link };
                res.send(output);
            }
        );
    });
    py.stdin.write(JSON.stringify(data));
    py.stdin.end();
});

app.listen(config.port, () => {
    console.log(`App is listening to ${config.port}`);
});
