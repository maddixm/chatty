import React, { Component } from "react";

export default class ChatBar extends Component {
  constructor() {
    super();
    // this.state = {};
  }

  render() {

    return(
        <footer className="chatbar">
          <input className="chatbar-username"
            placeholder="Your Name (Optional)"
            defaultValue={this.props.currentUser.name}
          />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>
    );
  }

}