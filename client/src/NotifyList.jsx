import React, { Component } from "react";

class NotifyList extends Component {
  constructor() {
    super();
  }

  render() {

   // build a message for each of the notifications
   let notifyArr; // will not display if no notifications
   if( this.props.notifications ) {
       notifyArr = this.props.notifications.map(notify =>
          <div className="message system">
          **{notify.user.prevname}** changed their name to **{notify.user.name}**
          </div>
      );
    }

    return(
      <div>{notifyArr}</div>
    );
  }

}

export default NotifyList