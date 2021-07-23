import React from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "./SidebarChannel";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import { Avatar } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import db, { auth } from "./firebase";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Sidebar = () => {
  let backEndURL = "http://localhost:9000";
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    axios({
      method: "post",
      url: `${backEndURL}/getchannel`,
      data: {
        firstName: "Fred",
        lastName: "Flintstone",
      },
    });
  }, []);

  const handleAddChannel = (e) => {
    e.preventDefault();
    const channelName = prompt("Enter a new channel name");
    const messages = [];
    const channels = { channelName };
    // console.log(channelName);
    if (channelName) {
      // console.log(JSON.stringify(channels));

      fetch(`${backEndURL}/addchannel`, {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify(channels),
      })
        .then((res) => {
          alert(res);
          alert(`${channelName} added successfully`);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Clever Programmer</h3>
        <ExpandMoreIcon />
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>

          <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
        </div>

        <div className="sidebar__channelsList">
          {channels.length &&
            channels.map(({ id, channelName }) => (
              <SidebarChannel key={id} id={id} channelName={channelName} />
            ))}
          {!channels.length && <div>No Channels Created</div>}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcons"
          fontSize="large"
        />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>

        <div className="sidebar__voiceIcons">
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>
      {/* <div className="sidebar__profile">
        <Avatar />
        <div className="sidebar__profileInfo">
          <h3>Hello</h3>
          <p>#userid</p>
        </div>

        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div> */}
      <div className="sidebar__profile">
        <Avatar src={user.photo} onClick={() => auth.signOut()} />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>

        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
