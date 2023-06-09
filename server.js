const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

app.use(cors());

let rooms = {}
let messageHistory = {}
let playerCounter = {};

io.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('joinRoom', (roomId) => {
    if (!rooms[roomId]) {
      rooms[roomId] = [];
      playerCounter[roomId] = 0; // initialize player counter for this room
    }
    
    // Increment the player counter
    playerCounter[roomId]++;
    
    // Store the player number on the socket
    socket.playerNumber = playerCounter[roomId];
    
    // Add the socket to the room's array
    rooms[roomId].push(socket.id);

    // Initialize the message history for this socket
    messageHistory[socket.id] = [];

    socket.join(roomId);
  
    // Send a confirmation message back to the client
    io.to(roomId).emit('message', { sender: 'Server', message: `Player${socket.playerNumber} joined room ${roomId}` });
    console.log(`Player${socket.playerNumber} joined room ${roomId}`);
  });

  socket.on('message', (data) => {
    console.log('Server Received message:', data);
    
    let newMessage = `Player${socket.playerNumber}: ${data.message}`;
    messageHistory[socket.id].push(newMessage);
    
    // Send message to the room
    io.in(data.roomId).emit('message', { sender: `Player${socket.playerNumber}`, message: data.message });
    console.log('sent message to room: ', data.roomId);
  });

  socket.on('disconnect', () => {
    let roomIds = Object.keys(rooms);
    for(let i = 0; i < roomIds.length; i++) {
      if(rooms[roomIds[i]].includes(socket.id)) {
        rooms[roomIds[i]] = rooms[roomIds[i]].filter(id => id !== socket.id);
        io.in(roomIds[i]).emit('playerDisconnected', { playerNumber: socket.playerNumber });
        // ask clients if they want to download the message history
      }
    }
  });
});

app.get('/downloadHistory', (req, res) => {
  // retrieve the room and player id from the request
  let playerId = req.query.playerId;

  // find the message history for this player
  let history = messageHistory[playerId];

  // send the history as a response
  res.send(history.join('\n'));
});


server.listen(3002, () => {
  console.log('Socket.IO server listening on port 3002');
});
