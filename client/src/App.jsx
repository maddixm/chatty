import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: ""}, // If currentUser is not defined, will be Anonymous
      messages:[] //messages from server will be stored here as they arrive
    };

  }

  receiveNewMessage = (msg) => {
    // create the message object and upate the list
    const newMsg = {
                  id: msg.id,
                  username: (msg.user === "") ? "Anonymous" : msg.user,
                  content: msg.content
                  };

    // send a copy of the message to the server (must be string)
    this.socket.send(JSON.stringify(
        {username: newMsg.username,
         content: newMsg.content,
         type: "postMessage"
        }
      )
    );

  }

  updateUser = (user) => {
    // update user from chatbar
    this.setState(
       {currentUser: user}
    );

    // send a notification to the server
    this.socket.send(JSON.stringify(
        {user,
         type: "postNotification"
        }
      )
    );

  }

  componentDidMount() {

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

    const updateMessageState = (msg) => {
      // add a new message to the state
      const updateMsg = this.state.messages.concat(msg);
      this.setState({messages: updateMsg});
    };

    // create and open the websocket
    this.socket = new WebSocket('ws://localhost:3001'); //ws b/c http
    // this.socket.addEventListener('message', this.gotMsg);
    this.socket.onopen = () => {
      this.setState({closed: false});
      console.log("We're connected.");

      // process broadcast messages
      this.socket.onmessage = function incoming(e) {
        const msg = JSON.parse(e.data);
        console.log(`${msg.id} User ${msg.username} said ${msg.content}`);
        updateMessageState(msg); // updates browser
      };
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser}
          receiveNewMessage={this.receiveNewMessage}
          updateUser={this.updateUser}
        />
      </div>
    );
  }
}
export default App;
