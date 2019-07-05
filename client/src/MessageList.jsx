import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {
  constructor() {
    super();
  }

  // chat messages
  buildMsg = (msg) => {
    if(msg.content) {
      return(<Message key={msg.id} username={msg.username} content={msg.content} />);
    }
  }

  //system notifications
  buildNotify = (msg) => {
    if(msg.user && msg.type === "incomingNotification") {
      return(
        <div className="message system" key={msg.id}>
        {msg.user.prevname} has changed their name to {msg.user.user}.
        </div>
      );
    }
  }

  render() {

    // build message and notification elements
    const messageArr = this.props.messages.map(msg => {
      return( msg.type === "incomingMessage" ? this.buildMsg(msg) : this.buildNotify(msg));
    });

    return(
      <main className="messages">
        {messageArr}
      </main>
    );
  }

}

export default MessageList

//you are trying to sort out the message notifications here