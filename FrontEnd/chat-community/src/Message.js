import { Avatar } from "@material-ui/core";
import React from "react";
import "./Message.css";

const Message = ({ timestamp, userID, message, currUser, userName }) => {
    let leftClassName = "align-left";
    let rightClassName = "align-right";

    return (
        <div
            className={userID === currUser.uid ? rightClassName : leftClassName}
        >
            <Avatar />
            <div className="message">
                <div className="message__info">
                    <h4>
                        {userName}
                        <span className="message__timestamp">
                            {new Date(timestamp).toUTCString()}
                        </span>
                    </h4>

                    <p className="message-content">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default Message;
