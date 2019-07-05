import React, { Component } from "react";

export default class ChatBar extends Component {
  constructor() {
    super();
  }

  checkUserChange = (event) => {

    // handles onblur and keydown
    if(!event.key || event.key == "Enter") {

      let oldName = this.refs.form.chatuser.defaultValue;
      let newName = this.refs.form.chatuser.value;

      //only update if the name changed
      if(newName !== oldName) {
        const msg = {
          user: newName,
          prevname: (oldName) ? oldName : "Anonymous"
        };

        this.props.updateUser(msg);
        this.props.receiveNewMessage(msg); // notification

        // reset the default username on the form
        this.refs.form.chatuser.defaultValue = newName;

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