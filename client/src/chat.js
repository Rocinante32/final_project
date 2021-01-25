import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import { socket } from "./socket";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.messages);
    const [signIn, setSignIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [messages, setNewMessages] = useState([]);

    // console.log("chatmsg: ", chatMessages);
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log("enter has been pressed");
            socket.emit("username", e.target.value);
            setUserName(e.target.value);
            setSignIn(true);
            e.target.value = null;
        }
    };
    const elemRef = useRef();
    const handleNewMessage = (e) => {
        if (e.key === "Enter") {
            console.log("enter has been pressed");
            socket.emit("chat_message", {
                message: e.target.value,
                user: userName,
            });
            e.target.value = null;
        }
    };

    socket.on("chat_message", (data) => {
        console.log("new msg rcvd: ", data);
        setNewMessages(...messages, data);
        console.log("messages after setting: ", messages);
    });

    // if (!socket.session) {
    //     var username = prompt("please enter your username");
    //     socket.emit("username", username);
    // } else {
    //     console.log("username: ", socket.username);
    // }
    console.log("messages after setting 2: ", messages);

    return (
        <>
            {!signIn && (
                <input placeholder="username" onKeyDown={handleKeyDown} />
            )}
            <h1 className="bodyTextCol">Welcome to the chat {userName}</h1>
            {signIn && (
                <div className="chat-container" ref={elemRef}>
                    {messages.map((data, i) => (
                        <div className="user" key={i}>
                            <p>
                                {data.user} - {data.message}
                            </p>
                        </div>
                    ))}
                    <textarea onKeyDown={handleNewMessage} />
                </div>
            )}
        </>
    );
}
