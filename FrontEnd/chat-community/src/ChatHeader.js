import React, { Component } from "react";
import "./ChatHeader.css";
import InfoIcon from "@material-ui/icons/Info";

class ChatHeader extends Component {
    handleClick() {
        window.open(this.props.suggestionLink.address, "_blank");
    }
    render() {
        return (
            <div className="chatHeader">
                <div className="chatHeader__left">
                    <h3>
                        <span className="chatHeader__hash">#</span>
                        {this.props.channelName}
                    </h3>
                </div>

                <div className="chatHeader__right">
                    <InfoIcon onClick={this.handleClick.bind(this)} />
                </div>
            </div>
        );
    }
}

export default ChatHeader;
