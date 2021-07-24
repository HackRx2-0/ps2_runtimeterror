import React from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "./SidebarChannel";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Avatar } from "@material-ui/core";
import db, { auth } from "./firebase";
import { useState } from "react";
import { useEffect } from "react";

const Sidebar = ({ user, onChannelChange }) => {
    const [channels, setChannels] = useState([]);
    let backEndURL = "http://localhost:9000";
    useEffect(() => {
        fetch(`${backEndURL}/getchannel`)
            .then((data) => data.json())
            .then((res) => {
                console.log(res[0]);
                setChannels([...res]);
                console.log(channels);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleAddChannel = (e) => {
        e.preventDefault();
        const channelName = prompt("Enter a new channel name");
        // console.log(channelName);
        if (channelName) {
            fetch("http://localhost:9000/addchannel", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ channelName: channelName }),
            })
                .then(() => {
                    fetch(`${backEndURL}/getchannel`)
                        .then((data) => data.json())
                        .then((res) => {
                            console.log(res[0]);
                            setChannels([...res]);
                            console.log(channels);
                        })
                        .catch((err) => {
                            alert(err.message);
                        });
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
    };
    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h3>HackeRX2.0 RuntimeTerror</h3>
                <ExpandMoreIcon />
            </div>

            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                    </div>

                    <AddIcon
                        onClick={handleAddChannel}
                        className="sidebar__addChannel"
                    />
                </div>

                <div className="sidebar__channelsList">
                    {channels.map((channel) => (
                        <SidebarChannel
                            key={channel._id}
                            id={channel._id}
                            channelName={channel.channelName}
                            onChannelChange={onChannelChange}
                        />
                    ))}
                </div>
            </div>

            <div className="sidebar__profile">
                <Avatar src={user.photo} />
                <div className="sidebar__profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0, 5)}</p>
                </div>

                <div className="sidebar__profileIcons">
                    <ExitToAppIcon
                        onClick={() => auth.signOut()}
                        style={{ cursor: "pointer" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
