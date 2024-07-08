const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Enable CORS for all origins
app.use(cors());

const sendMessage = (client) => {
  client.on('send-message', (payload) => {
    client.broadcast.emit('message', payload);
  });
};

io.on('connection', (client) => {
  console.log(`Client connected: ${client.id}`);

  sendMessage(client);

  client.on('disconnect', () => {
    console.log(`Client disconnected: ${client.id}`);
  });
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
