import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";

function Login({ onLogin }) {
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(onLogin)
            .catch((err) => alert(err.message));
    };
    return (
        <div className="login">
            <div className="login__logo">
                <img
                    src="https://hackrx.in/images/head.png"
                    alt="discord logo"
                    height="500px"
                />
            </div>

            <Button onClick={signIn}>Sign In</Button>
        </div>
    );
}

export default Login;
