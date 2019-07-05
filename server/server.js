// server.js
/* jshint esversion: 6 */

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1'); // uuid based on timestamp
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// send message function
const sendMsg = (msg) => {
  // broadcast a message to all connected clients
  wss.clients.forEach(function each(client) {
    if (client.readyState === 1) { // 1 means socket is open
      client.send(JSON.stringify(msg));
    }
  });
};

// send connected client counts
const sendClientCount = (totalClients) => {
  const countMsg = {
    type: "userCountChanged",
    userCount: totalClients
  };
  sendMsg(countMsg);
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  sendClientCount(wss.clients.size);

  // send any received messages
  ws.on('message', function incoming(Data) {
    const msg = JSON.parse(Data);
    msg.id = uuidv1(); // set unique id

    if(msg.type === "postMessage") {
      // chat messages
      msg.type = "incomingMessage";
      sendMsg(msg);

    } else if (msg.type === "postNotification") {
      // username changes
      msg.type = "incomingNotification";
      sendMsg(msg);

    }

  });

  // Set up a callback for when a client closes the socket.
  // This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    sendClientCount(wss.clients.size);
  });

});