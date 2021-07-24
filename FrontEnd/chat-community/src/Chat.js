import React from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CradGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmoticonsIcon from "@material-ui/icons/EmojiEmotions";
import Message from "./Message";
import { useState } from "react";
import { useEffect } from "react";
import db from "./firebase";
import firebase from "firebase";

const Chat = ({ user, channelId, channelName }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [suggestedLink, setSuggestedLink] = useState({
    address: "http://amazon.com",
  });

  useEffect(() => {
    if (channelId) {
      fetch("http://localhost:9000/getchanneldetails", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: channelId }),
      })
        .then((data) => data.json())
        .then((res) => {
          console.log(res);
          setMessages([...res.foundMessages]);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (channelId) {
      fetch("http://localhost:9000/keyword", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          str: input,
        }),
      }).then((link) => {
        link.json().then((data) => {
          const address = data.link;
          setSuggestedLink({ address });
        });
      });

      fetch("http://localhost:9000/addmessage", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          channel_id: channelId,
          user_id: user.uid,
          user_name: user.displayName,
        }),
      })
        .then((data) => data.json())
        .then((res) => {
          fetch("http://localhost:9000/getchanneldetails", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: channelId }),
          })
            .then((data) => data.json())
            .then((res) => {
              console.log(res);
              setMessages([...res.foundMessages]);
            })
            .catch((err) => {
              alert(err.message);
            });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    setInput("");
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} suggestionLink={suggestedLink} />

      <div className="chat__messages">
        {messages.length > 0 &&
          messages.map((message) => (
            <div style={{ border: "1ps solid red" }}>
              <Message
                message={message.message}
                timestamp={message.createdAt}
                userID={message.user_id}
                userName={message.user_name}
                currUser={user}
              />
            </div>
          ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            type="text"
            disabled={!channelId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <button
            className="chat__inputButton"
            onClick={sendMessage}
            disabled={!channelId}
            style={{ color: "red" }}
            type="submit"
          >
            Send Message
          </button>
        </form>

        <div className="chat__inputIcon">
          <CradGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmoticonsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
