import React, { useState, useEffect } from "react";
import {
  //Button,
  FormControl,
  //InputLabel,
  //Input,
  IconButton,
} from "@material-ui/core";
import "./App.css";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";

function App() {
  // state allows us to change variables on front end without refreshing which is not seen in normal variables.
  //concept of ReactJS hooks 
  //useState = variable in React which allocates small memory which goes away on rrefreshing
  const [input,setInput] = useState('');
  const [messages,setMessages] = useState([]);
  const [username,setUsername] = useState('');
  
  useEffect(() => {
    db.collection("messages")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({id:doc.id, message:doc.data()}))
        );
    });
  }, [] )

  // useEffect = run code based on a condition
  useEffect(() => {
    setUsername(prompt("Please Enter Your Name"));
    //if its blank inside [], then This code runs once when the app component loads 

  }, []) //Condition inside []

  const sendMessage = (event) => {
      // By default in form tag when we press enter the page gets refreshed
      // and thats y our message will not be able to seen.
      // so In order to prevent page from refreshing we are using prevent default on this event
      event.preventDefault();
      db.collection("messages").add({
        message: input,
        username: username,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput("");
    };

  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=80&h=80" alt="FB"></img>
      <h1>Facebook Messenger</h1>
      <h2>Welcome {username}</h2>

      {/* If we will not use form it prevents us from makin entry by Pressing Enter key thats y we included input and button field inside form tag  */}
      <form className="app_form">
      <FormControl className="app__formControl">
      <input 
      className="app__input"
      placeholder="Enter a message..."
      value={input}
      onChange={(event) => setInput(event.target.value)}
        />
      <IconButton
            className="app__iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
      </FormControl>
      </form>
      <FlipMove>
      {
        messages.map(({id, message}) => (
          <Message key={id} username={username} message={message} />
        ))
      }
      </FlipMove>
    </div>
  );
}

export default App;