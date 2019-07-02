import React, { Component } from "react";

export default class ChatBar extends Component {
  constructor() {
    super();
    this.checkEnter = this.checkEnter.bind(this);
  }

  checkEnter(event) {
    if(event.key === "Enter") {
      const msg = {
        user: this.refs.form.chatuser.value,
        content: this.refs.form.chatmessage.value
      };
      console.log(msg);
    }
  }

  render() {

    return(
        <footer className="chatbar">
          <form ref="form">
            <input name="chatuser" className="chatbar-username"
              placeholder="Your Name (Optional)"
              defaultValue={this.props.currentUser.name}
            />
            <input name="chatmessage" className="chatbar-message"
              placeholder="Type a message and hit ENTER"
              onKeyDown={this.checkEnter}
            />
          </form>
        </footer>
    );
  }

}