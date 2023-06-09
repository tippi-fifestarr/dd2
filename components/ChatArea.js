import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ChatArea = () => {
  const [socket, setSocket] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Create a Socket.IO connection on the client
    const socket = io('http://localhost:3002');

    // Listen for custom events or messages
    socket.on('message', (data) => {
      console.log('Client Received message:', data);

      // Handle the received message
      setMessageHistory(prevMessages => [...prevMessages, data]);
    });

    // Handle the nextQuestion event
    socket.on('nextQuestion', (data) => {
      console.log(`Player${data.nextPlayer}, it's your turn to ask a question.`);
    });

    // Handle the playerDisconnected event
    socket.on('playerDisconnected', (data) => {
      if(window.confirm(`Player${data.playerNumber} has left the room. Would you like to download the chat history?`)) {
        downloadHistory();
      }
    });

    setSocket(socket);

    // Disconnect on component unmount
    return () => {
      console.log('Message history: ', messageHistory);
      socket.disconnect();
    };
  }, []);

  const joinRoom = () => {
    if (socket) {
      socket.emit('joinRoom', roomId);
    }
  };

  const sendMessage = () => {
    if (socket) {
      // Emit a message event
      socket.emit('message', {roomId: roomId, message: message});
    }
  };

  const questionFinished = () => {
    if (socket) {
      // Emit a questionFinished event
      socket.emit('questionFinished', {roomId: roomId});
    }
  };

  const downloadHistory = () => {
    // window.location.href = `http://localhost:3002/downloadHistory?roomId=${roomId}&playerId=${socket.id}`;
    window.location.href = `http://localhost:3002/downloadHistory?roomId=${roomId}&playerId=1`;

  };

  const disconnect = () => {
    console.log('Message history: ', messageHistory);
    socket.disconnect();
  };

  return (
    <div>
      Socket.IO example
      <div>
        <input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="Enter room ID" />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <div>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter message" />
        <button onClick={sendMessage}>Send Message</button>
        <button onClick={questionFinished}>Finish Question</button>
      </div>
      <button onClick={disconnect}>Exit</button>
      <ul>
        {messageHistory.map((messageData, index) => (
          <li key={index}>
            <strong>{messageData.sender}:</strong> {messageData.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatArea;
