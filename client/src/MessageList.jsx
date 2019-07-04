import React, { Component } from "react";
import Message from "./Message.jsx";
import NotifyList from "./NotifyList.jsx";

class MessageList extends Component {
  constructor() {
    super();
  }

  render() {

  // build a message for each of the messages
    const messageArr = this.props.messages.map(msg =>
      <Message
        key={msg.id}
        username={msg.username}
        content={msg.content}
      />
    );

    return(
      <main className="messages">
        {messageArr}
        <NotifyList />
      </main>
    );
  }

}

export default MessageList