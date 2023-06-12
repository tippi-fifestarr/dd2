const express = require("express");
// import dotenv
require("dotenv").config({ path: ".env.local" });
// console.log(process.env.CORS_LOCATION);
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    // origin: process.env.CORS_LOCATION,
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// console.log(process.env.CORS_LOCATION);

app.use(cors());

let rooms = {};
let messageHistory = {};
let playerCounter = {};

io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("joinRoom", (roomId) => {
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
    // messageHistory[socket.id] = [];
    messageHistory[roomId] = messageHistory[roomId] || [];

    socket.join(roomId);

    // Send a confirmation message back to the client
    io.to(roomId).emit("message", {
      sender: "Server",
      message: `Player${socket.playerNumber} joined room ${roomId}`,
    });
    console.log(`Player${socket.playerNumber} joined room ${roomId}`);
  });

  socket.on("message", (data) => {
    console.log("Server Received message:", data);

    let newMessage = `Player${socket.playerNumber}: ${data.message}`;
    // messageHistory[socket.id].push(newMessage);
    // messageHistory[roomId].push(newMessage);
    messageHistory[data.roomId].push(newMessage);

    // Send message to the room
    io.in(data.roomId).emit("message", {
      sender: `Player${socket.playerNumber}`,
      message: data.message,
    });
    console.log("sent message to room: ", data.roomId);
  });
  socket.on("finishQuestion", (data) => {
    let newMessage = `Player${socket.playerNumber} finished asking question. Other players please answer Yes or No.`;
    messageHistory[data.roomId].push(newMessage);
    io.in(data.roomId).emit("message", {
      sender: `Player${socket.playerNumber}`,
      message: newMessage,
    });
    console.log("sent finishQuestion message to room: ", data.roomId);
  });

  socket.on("answerYes", (data) => {
    let newMessage = `Player${socket.playerNumber} answered Yes.`;
    messageHistory[data.roomId].push(newMessage);
    io.in(data.roomId).emit("message", {
      sender: `Player${socket.playerNumber}`,
      message: newMessage,
    });
    console.log("sent answerYes message to room: ", data.roomId);
  });

  socket.on("answerNo", (data) => {
    let newMessage = `Player${socket.playerNumber} answered No.`;
    messageHistory[data.roomId].push(newMessage);
    io.in(data.roomId).emit("message", {
      sender: `Player${socket.playerNumber}`,
      message: newMessage,
    });
    console.log("sent answerNo message to room: ", data.roomId);
  });

  socket.on("disconnect", () => {
    let roomIds = Object.keys(rooms);
    for (let i = 0; i < roomIds.length; i++) {
      if (rooms[roomIds[i]].includes(socket.id)) {
        rooms[roomIds[i]] = rooms[roomIds[i]].filter((id) => id !== socket.id);
        io.in(roomIds[i]).emit("playerDisconnected", {
          playerNumber: socket.playerNumber,
        });
        // ask clients if they want to download the message history
      }
    }
  });



  socket.on('chosenCardChange', (data) => {
    let x = data;
    console.log(x);
  });
  
  // On 'finalCardChange' event
  socket.on('finalCardChange', (data) => {
    let x = data;
    console.log(x);
  });
  socket.on('whoWin', (data) => {
    let x,y,z = data;
    console.log(x);
    console.log(y);
    console.log(z);
    
    // if (y === z[0].id){
    //   console.log("Player 1 wins");
    //   io.in(data.roomId).emit("message", {
    //     message: "Player 1 wins",
    //   });
    // }
    // else{
      console.log("Player 2 wins");
      io.in(data.roomId).emit("message", {
        sender: `Server`,
        message: "Player 2 wins",
      });


    // }

  });
});

// when the game state determines winner, access the .env.local variable THIRDWEB_AUTH_PRIVATE_KEY
// and trigger a contract call via thirdweb sdk.

app.get("/downloadHistory", (req, res) => {
  // retrieve the room and player id from the request
  let roomId = req.query.roomId;
  let playerId = req.query.playerId;

  // find the message history for this player and room
  // let history = messageHistory[playerId];
  // find the message history for this room
  let history = messageHistory[roomId];

  if (history) {
    // send the history as a response
    res.send(history.join("\n"));
  } else {
    res.status(404).send("No message history found for this player");
  }
});

server.listen(3002, () => {
  console.log("Socket.IO server listening on port 3002");
});
