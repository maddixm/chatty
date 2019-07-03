import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages:[
                {
                  id: 1,
                  username: "Bob",
                  content: "Has anyone seen my marbles?",
                },
                {
                  id: 2,
                  username: "Anonymous",
                  content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
                }
              ]
    };

  }


  receiveNewMessage = (msg) => {
    // handles message received from chatbar

    const getRandomID = function () {
      // from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
      return(Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5));
    };

    // create the message object and upate the list
    const newMsg = {
                  id: getRandomID(),
                  username: (msg.user === "") ? "Anonymous" : msg.user,
                  content: msg.content
                  };
    // const updateMsg = this.state.messages.concat(newMsg);
    // this.setState({messages: updateMsg});

    // send a copy of the message to the server
    this.socket.send(JSON.stringify(
      {username: newMsg.username,
       content: newMsg.content}
      )
    );

  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3,
        username: "Michelle",
        content: "Hello there!"
      };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages});
    }, 3000);

    // create and open the websocket
    this.socket = new WebSocket('ws://localhost:3001'); //ws b/c http
    this.socket.onopen = () => {
      this.setState({closed: false});
      console.log("We're connected.");
    };

  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} receiveNewMessage={this.receiveNewMessage}/>
      </div>
    );
  }
}
export default App;
