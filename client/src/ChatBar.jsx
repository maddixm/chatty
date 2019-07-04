import React, { Component } from "react";

export default class ChatBar extends Component {
  constructor() {
    super();
  }

  checkUserChange = (event) => {

    // handles onblue and keydown
    if(!event.key || event.key == "Enter") {

      if(this.refs.form.chatuser.value !== this.refs.form.chatuser.defaultValue) {
        //only update if the name changed
        this.props.updateUser({
          name: this.refs.form.chatuser.value,
          prevname: (this.refs.form.chatuser.defaultValue) ? this.refs.form.chatuser.defaultValue : "Anonymous"
        });
      }

    }

  }

  checkMessageEntered = (event) => {

    if(event.key === "Enter" && this.refs.form.chatmessage.value) {
      const msg = {
        user: this.refs.form.chatuser.value,
        content: this.refs.form.chatmessage.value
      };

      this.props.receiveNewMessage(msg); // return form values to App.jsx
      this.refs.form.chatmessage.value = "";
    }

  }

  render() {

    return(
        <footer className="chatbar">
          <form ref="form">
            <input name="chatuser" className="chatbar-username"
              ref={this.props.inputRef}
              placeholder="Your Name (Optional)"
              defaultValue={this.props.currentUser.name}
              onBlur={this.checkUserChange}
              onKeyDown={this.checkUserChange}
            />
            <input name="chatmessage" className="chatbar-message"
              ref={this.props.inputRef}
              placeholder="Type a message and hit ENTER"
              onKeyDown={this.checkMessageEntered}
            />
          </form>
        </footer>
    );
  }

}