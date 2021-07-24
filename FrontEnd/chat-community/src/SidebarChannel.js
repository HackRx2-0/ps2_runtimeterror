import React from "react";
import "./SidebarChannel.css";

function SidebarChannel({ id, channelName, onChannelChange }) {
    return (
        <div
            className="sidebarChannel"
            onClick={() => {
                onChannelChange({
                    channelId: id,
                    channelName: channelName,
                });
            }}
        >
            <h4>
                <span className="sidebarChannel__hash">#</span>
                {channelName}
            </h4>
        </div>
    );
}

export default SidebarChannel;
