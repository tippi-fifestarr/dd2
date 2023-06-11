import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const ChatArea = ({ chosenCard }) => {
  const [socket, setSocket] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const socket = io(process.env.SOCKET_LOCATION);

    socket.on("message", (data) => {
      setMessageHistory((prevMessages) => [...prevMessages, data]);
    });

    socket.on("nextQuestion", (data) => {
      console.log(
        `Player${data.nextPlayer}, it's your turn to ask a question.`
      );
    });

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

    return () => {
      socket.disconnect();
    };
  }, []);

  const emitSocketEvent = (eventName, payload) => {
    socket && socket.emit(eventName, { roomId, message, ...payload });
  };

  const downloadHistory = () => {
    if (!socket) return;

    fetch(`${process.env.SOCKET_LOCATION}/downloadHistory?roomId=${roomId}`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "history.txt";
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
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
              onClick={() => emitSocketEvent("joinRoom")}
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
              placeholder="Enter your message"
              className="border p-2 mr-2 rounded"
            />
            <button
              onClick={() => emitSocketEvent("sendMessage")}
              className="bg-green-500 text-white p-2 rounded"
            >
              Send
            </button>
            <button
              onClick={downloadHistory}
              className="bg-red-500 text-white p-2 rounded"
            >
              Download Chat History
            </button>
          </div>

          <div className="mt-4 border p-4 rounded overflow-auto h-64">
            {messageHistory.map((msg, index) => (
              <p key={index} className="mb-2">
                {msg}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatArea;
