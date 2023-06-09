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

//console.log('sent message to room: ', data.roomId);
io.on('connection', (socket) => {
  console.log('A client connected');


  socket.on('joinRoom', (roomId) => {
    if (rooms[roomId]) {
      rooms[roomId].push(socket.id);
    } else {
      rooms[roomId] = [socket.id];
      playerCounter[roomId] = 0; // initialize player counter for this room
    }
    messageHistory[socket.id] = [];
    
    // Increment the player counter
    playerCounter[roomId]++;

    socket.join(roomId);
  
    // Send a confirmation message back to the client
    io.to(roomId).emit('message', { sender: 'Server', message: `Player${playerCounter[roomId]} joined room ${roomId}` });
  });
  

  socket.on('message', (data) => {
    console.log('Server Received message:', data);
    messageHistory[socket.id].push(`Player${playerCounter[data.roomId]}: ${data.message}`);
    // Send message to the room
    io.in(data.roomId).emit('message', { sender: `Player${playerCounter[data.roomId]}`, message: data.message });
    console.log('sent message to room: ', data.roomId);
  });




  socket.on('disconnect', () => {
    // Remove the disconnected socket from all rooms
    for(let room in rooms) {
      const index = rooms[room].indexOf(socket.id);
      if (index > -1) {
        rooms[room].splice(index, 1);
      }
    }
    console.log(`Message history for client ${socket.id}: `, messageHistory[socket.id])
    delete messageHistory[socket.id];
    console.log('A client disconnected');
  });
});


server.listen(3002, () => {
  console.log('Socket.IO server listening on port 3002');
});
