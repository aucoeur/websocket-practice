// Import dependencies
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// Define a port
const port = 6969;
// create a server
const server = http.createServer(express);
// Create a web socket server
const wss = new WebSocket.Server({ server })

// Handle a web socket connection
wss.on('connection', (ws) => {
	// After making a connection start listening for messages
	console.log('client connecting')

  // Handle
  ws.on('message', (data) => {
		// For each client broadcast the data
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})

// Start the server
server.listen(port, () => {
  console.log(`Server is listening on ${port}!`)
})
