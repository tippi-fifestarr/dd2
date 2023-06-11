// this one wasn't working with the env stuff...
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const ChatArea = ({ chosenCard }) => {
  const [socket, setSocket] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Create a Socket.IO connection on the client
    const socket = io(process.env.SOCKET_LOCATION);

    // Listen for custom events or messages
    socket.on("message", (data) => {
      console.log("Client Received message:", data);

      // Handle the received message
      setMessageHistory((prevMessages) => [...prevMessages, data]);
    });

    // Handle the nextQuestion event
    socket.on("nextQuestion", (data) => {
      console.log(
        `Player${data.nextPlayer}, it's your turn to ask a question.`
      );
    });

    // Handle the playerDisconnected event
    socket.on("playerDisconnected", (data) => {
      if (
        window.confirm(
          `Player${data.playerNumber} has left the room. Would you like to download the chat history?`
        )
      ) {
        downloadHistory();
      }
    });

    setSocket(socket);

    // Disconnect on component unmount
    return () => {
      console.log("Message history: ", messageHistory);
      socket.disconnect();
    };
  }, []);

  const joinRoom = () => {
    if (socket) {
      socket.emit("joinRoom", roomId);
    }
  };

  const sendMessage = () => {
    if (socket) {
      // Emit a message event
      socket.emit("message", { roomId: roomId, message: message });
    }
  };

  const questionFinished = () => {
    if (socket) {
      // Emit a questionFinished event
      socket.emit("finishQuestion", { roomId: roomId, message: message });
    }
  };

  const answerYes = () => {
    if (socket) {
      // Emit a answerYes event
      socket.emit("answerYes", { roomId: roomId, message: message });
    }
  };

  const answerNo = () => {
    if (socket) {
      // Emit a answerNo event
      socket.emit("answerNo", { roomId: roomId, message: message });
    }
  };

  const downloadHistory = () => {
    return new Promise((resolve, reject) => {
      if (socket) {
        console.log("Downloading history...");
        console.log("Socket ID: ", socket.id);
        // fetch(`http://localhost:3002/downloadHistory?roomId=${roomId}&playerId=${socket.id}`)
        fetch(`http://localhost:3002/downloadHistory?roomId=${roomId}`)
          .then((response) => response.blob())
          .then((blob) => {
            // Create a link and simulate a click to download the file
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "history.txt";
            document.body.appendChild(a);
            a.click();
            a.remove();
            resolve(); // resolve the Promise after download finishes
          })
          .catch(reject); // reject the Promise if there's an error
      } else {
        console.log("Socket is null");
        // reject(new Error('Socket is null'));
      }
    });
  };

  const disconnect = async () => {
    console.log("Message history: ", messageHistory);
    try {
      await downloadHistory(); // wait for the download to finish
    } catch (error) {
      console.log("Error downloading history:", error);
    }
    if (socket) {
      socket.disconnect();
      setSocket(null); // set socket to null after disconnecting
    }
  };
  return (
    <div>
      {chosenCard.name}
      <div>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter room ID"
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
        />
        <button onClick={sendMessage}>Send Message</button>
        <button onClick={questionFinished}>Finish Question</button>
        <button onClick={answerYes}>Answer Yes</button>
        <button onClick={answerNo}>Answer No</button>
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
