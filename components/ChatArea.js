import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const ChatArea = ({ chosenCard, finalCard }) => {
  const [socket, setSocket] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  // useeffect to console log the final card being sent in
  useEffect(() => {
    console.log("final card: ", finalCard);
    console.log("cc: ", chosenCard);
  }, [finalCard]);

  useEffect(() => {
    // Create a Socket.IO connection on the client
    const socket = io("http://localhost:3002");

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
    <div
      className={`w-fit rounded-xl p-1 mx-2 mb-1 flex flex-col absolute bottom-4 right-4 ${
        isExpanded ? "bg-slate-600 bg-opacity-80" : ""
      }`}
      style={{ zIndex: 1000 }}
    >
      <div
        className="text-xs md:text-base lg:text-lg text-slate-200 cursor-pointer mb-2 flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        💬 Chat {isExpanded ? <span>&#9650;</span> : <span>&#9660;</span>}
      </div>

      {isExpanded && (
        <>
          <h2 className="text-xl font-bold mb-4 text-slate-200">
            {chosenCard.name}
          </h2>

          <div className="mb-4">
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter room ID"
              className="border p-2 mr-2 rounded"
            />
            <button
              onClick={joinRoom}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Join Room
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message"
              className="border p-2 mr-2 rounded"
            />
            <button
              onClick={sendMessage}
              className="bg-green-500 text-white p-2 rounded"
            >
              Send Message
            </button>
            <button
              onClick={questionFinished}
              className="bg-yellow-500 text-white p-2 rounded"
            >
              Finish Question
            </button>
            <button
              onClick={answerYes}
              className="bg-green-500 text-white p-2 rounded"
            >
              Answer Yes
            </button>
            <button
              onClick={answerNo}
              className="bg-red-500 text-white p-2 rounded"
            >
              Answer No
            </button>
          </div>

          <button
            onClick={disconnect}
            className="bg-gray-500 text-white p-2 rounded mb-4"
          >
            Exit
          </button>

          <div className="mt-4 border p-4 rounded overflow-auto h-64">
            {messageHistory.map((messageData, index) => (
              <p key={index} className="mb-2">
                <strong>{messageData.sender}:</strong> {messageData.message}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatArea;
