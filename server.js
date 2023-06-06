




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
// 使用 cors 中间件允许跨域请求
app.use(cors());



io.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('message', (data) => {
    console.log('Server Received message:', data);
    // 处理接收到的消息

    // 发送消息给客户端
    socket.emit('message', 'Server says hello!');
  });

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

server.listen(3002, () => {
  console.log('Socket.IO server listening on port 3002');
});
