import { useState, useRef, useEffect } from "react";
import { socket } from "./socket";
import { Paper } from "@material-ui/core";

export default function Chat() {
    // const chatMessages = useSelector((state) => state && state.messages);
    const [signIn, setSignIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [messages, setNewMessages] = useState([]);
    const [numberUsers, setNumberUsers] = useState("0");

    var elemRef = useRef();
    // document.getElementsByClassName("chat-container");

    useEffect(() => {
        socket.on("chat_message", (message) => {
            console.log("new message received: ", message);
            setNewMessages([...messages, message]);
        });
        if (messages.length > 0) {
            const chat = document.getElementById("chat-container");
            elemRef.current.scrollTop = elemRef.current.scrollHeight;
        }
        socket.on("numUsers", (number) => {
            console.log("num of users: ", number.usersOnline);
            setNumberUsers(number.usersOnline);
        });

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
            var todayDate = new Date();
            let time = todayDate.toString().slice(16, 21);
            console.log("enter has been pressed");
            socket.emit("chat_message", {
                message: e.target.value,
                user: userName,
                time: time,
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
            <h2>Number of users online: {numberUsers}</h2>
            <div>
                <Paper elevation={8} id="chat-container" ref={elemRef}>
                    {messages &&
                        messages.map((data, i) => (
                            <div className="user" key={i}>
                                <p>
                                    {data.user} - {data.message}
                                </p>
                            </div>
                        ))}
                </Paper>
                {signIn && (
                    <div>
                        <textarea onKeyDown={handleNewMessage} />
                    </div>
                )}
            </div>
        </>
    );
}
