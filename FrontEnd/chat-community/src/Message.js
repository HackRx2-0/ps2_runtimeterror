import { Avatar } from "@material-ui/core";
import React from "react";
import "./Message.css";

const Message = ({ timestamp, user, message }) => {
  // const Message = ({ message }) => {

  // console.log(message)

  return (
    <div className="message">
      <Avatar src={user.photo} />
      <div className="message__info">
        <h4>
          {user.displayName}
          <span className="message__timestamp">
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
        </h4>

        <p>{message}</p>
      </div>
    </div>
    // <div className="message">
    //   <Avatar />
    //   <div className="message__info">
    //     <h4>
    //       Yash
    //       <span className="message__timestamp">Timestamp</span>
    //     </h4>

    //     <p>XYZ MESSAGE</p>
    //   </div>
    // </div>
  );
};

export default Message;
