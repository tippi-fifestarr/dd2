import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ChatArea = () => {
  const [socket, setSocket] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);

  useEffect(() => {
    // 在客户端上创建Socket.IO连接
    const socket = io('http://localhost:3002');

    // 监听连接事件
    socket.on('connect', () => {
      console.log('WebSocket connected');
      
      // Join a room
      const roomId = "yourRoomId";
      socket.emit('joinRoom', roomId);

      // 发送消息等操作
      const message = 'Hello, server!';
      setMessageHistory(prevMessages => [...prevMessages, message]);
      socket.emit('message', {roomId: roomId, message: message});
    });

    // 监听自定义事件或消息
    socket.on('message', (data) => {
      console.log('Client Received message:', data);
      // 处理接收到的消息
      setMessageHistory(prevMessages => [...prevMessages, data]);
    });

    setSocket(socket);

    // 在组件卸载时断开连接
    return () => {
      console.log('Message history: ', messageHistory);
      socket.disconnect();
    };
  }, []);

  const disconnect = () => {
    console.log('Message history: ', messageHistory);
    socket.disconnect();
  };

  return (
    <div>
      Socket.IO hhhhhhh example
      <button onClick={disconnect}>Exit</button>
    </div>
  );
};

export default ChatArea;


// const ChatArea = () => {
//   useEffect(() => {
//     // 在客户端上创建Socket.IO连接
//     // const socket = io();
//     const socket = io('http://localhost:3002');

//     // 监听连接事件
//     socket.on('connect', () => {
//       console.log('WebSocket connected');
//       socket.emit('message', 'Hello, server!');
//       // 发送消息等操作
//     });

//     // 监听自定义事件或消息
//     socket.on('message', (data) => {
//       console.log('Client Received message:', data);
//       // 处理接收到的消息
//     });

//     // 在组件卸载时断开连接
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return <div>Socket.IO hhhhhhh example</div>;
// };

// export default ChatArea;


// https://tailwind-elements.com/docs/standard/forms/inputs/

