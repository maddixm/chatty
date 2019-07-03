import React, { Component } from "react";

function MessageUsername(props) {
  return(
    <span className="message-username">{props.username}</span>
  );
}

function MessageContent(props) {
  return(
    <span className="message-content">{props.content}</span>
  );
}

export default class Message extends Component {
  constructor() {
    super();
  }

  render() {

    return(
      <div className="message">
        <MessageUsername username={this.props.username} />
        <MessageContent content={this.props.content} />
      </div>
    );
  }

}