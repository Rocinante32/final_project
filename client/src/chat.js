import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { socket } from "./socket";

export default function Chat() {
    // const chatMessages = useSelector((state) => state && state.messages);
    const [signIn, setSignIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [messages, setNewMessages] = useState([]);

    var elemRef = useRef();
    // document.getElementsByClassName("chat-container");

    useEffect(() => {
        socket.on("chat_message", (message) => {
            setNewMessages([...messages, message]);
        });
        if (messages.length > 0) {
            const chat = document.getElementById("chat-container");
            chat.scrollTo(0, 1000);
        }

        // // elemRef.current.scrollTo(0, 1000);
        return () => {
            socket.off("chat_message");
        };
    }, [messages]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log("enter has been pressed");
            socket.emit("username", e.target.value);
            setUserName(e.target.value);
            setSignIn(true);
            e.target.value = null;
        }
    };

    const handleNewMessage = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("enter has been pressed");
            socket.emit("chat_message", {
                message: e.target.value,
                user: userName,
            });
            e.target.value = null;
            e.target.setSelectionRange(0, 0);
        }
    };

    return (
        <>
            {!signIn && (
                <input placeholder="username" onKeyDown={handleKeyDown} />
            )}
            <h1 className="bodyTextCol">Welcome to the chat {userName}</h1>
            {signIn && (
                <div id="chat-container" ref={elemRef}>
                    {messages &&
                        messages.map((data, i) => (
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
