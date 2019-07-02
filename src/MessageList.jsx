import React, { Component } from "react";
import Message from "./Message.jsx";

function MessageSystem(props) {
  return(
    <div className="message system">
      Anonymous1 changed their name to nomnom.
    </div>
  );
}

export default class MessageList extends Component {
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
        <MessageSystem />
      </main>
    );
  }

}