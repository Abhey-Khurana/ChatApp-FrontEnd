import { useState, useEffect } from 'react'
import './App.css'
import { io } from "socket.io-client";


function App() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  // console.log(import.meta.env.VITE_SERVER_URL);
  const socket = io.connect(import.meta.env.VITE_SERVER_URL);

  function sendChat(e) {
    e.preventDefault();
    socket.emit("chat", { message });
    setMessage("");
  }
  useEffect(() => {
    socket.on("chat", (payload) => {
      // console.log(payload);
      setChat([...chat, payload]);
    })
  }, [sendChat]);
  return (
    <>
      <h1>Chat App</h1>

      {
        chat.map((payload,index) => {
          return <li key={index}>{payload.message}</li>
        })
      }

      <form onSubmit={sendChat}>

        <input
          type='text'
          placeholder='Enter Message'
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></input>
        <button type='submit'>SEND</button>
      </form>
    </>
  )
}

export default App
