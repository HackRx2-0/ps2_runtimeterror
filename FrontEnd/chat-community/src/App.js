import React from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Login from "./Login";
import { useState } from "react";
import { auth } from "./firebase";

function App() {
    const [userHooks, setUserHooks] = useState({});
    const [selectedChannel, setSelectedChannel] = useState({
        channelId: "",
        channelName: "",
    });

    const onChannelChange = ({ channelId, channelName }) => {
        setSelectedChannel({ channelId, channelName });
    };

    const userLogin = () => {
        auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if (authUser) {
                setUserHooks({
                    uid: authUser.uid,
                    photo: authUser.photoURL,
                    email: authUser.email,
                    displayName: authUser.displayName,
                });
            } else {
                setUserHooks({});
            }
        });
    };

    const fetchRequest = () => {
        fetch("http://localhost:9000/addchannel", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ channelName: "Hello Channel" }),
        });
    };

    return (
        <div className="app">
            {/* <button onClick={fetchRequest}>Click me</button> */}
            {userHooks.uid ? (
                <>
                    <Sidebar
                        user={userHooks}
                        onChannelChange={onChannelChange}
                    />
                    <Chat
                        channelName={selectedChannel.channelName}
                        channelId={selectedChannel.channelId}
                        user={userHooks}
                    />
                </>
            ) : (
                <Login onLogin={userLogin} />
            )}
        </div>
    );
}

export default App;
