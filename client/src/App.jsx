import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {

  constructor() {

    super();
    this.state = {
      currentUser: {name: ""}, // If currentUser is not defined, will be Anonymous
      messages:[], //messages and notifications
    };

  }

  receiveNewMessage = (msg) => {

    // create the message object and upate the message list
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
        content: "Hello there!",
        type: "incomingMessage"
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

    const updateUserCountState = (userCount) => {
      this.setState({userCount: userCount});
    };

    // create and open the websocket
    this.socket = new WebSocket('ws://localhost:3001'); //ws b/c http

    this.socket.onopen = () => {

      this.setState({closed: false});

      // process broadcast messages
      this.socket.onmessage = function incoming(e) {
        const msg = JSON.parse(e.data);

          if (msg.type === "userCountChanged" ) {
            updateUserCountState(msg.userCount);
          } else {
            updateMessageState(msg);
          }

      };

    };

  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
            <div className="counterbar">
            {this.state.userCount} users online
            </div>
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
