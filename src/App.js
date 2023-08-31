import React, { useState, useEffect } from "react";
import "./App.css";
import socketClient from "socket.io-client";

const SERVER = "http://127.0.0.1:4000";

const socket = socketClient(SERVER);
const userName = "User " + parseInt(Math.random() * 10);

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("message", (payload) => {
      setChat([...chat, payload]);
    });
  });

  const onMessagesubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { userName, message });
    console.log(message);
    setMessage("");
  };

  return (
    <div className="App">
      <h1>Real-time Messenger</h1>
      <form onSubmit={onMessagesubmit}>
        <input
          type="text"
          name="message"
          placeholder="Type message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button type="submit">Send</button>
      </form>
      {chat.map((message, index) => {
        return (
          <h3 key={index}>
            <span>{message.userName} : </span>
            {message.message}
          </h3>
        );
      })}
    </div>
  );
}

export default App;
