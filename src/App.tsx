import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import CreateGamePage from "./pages/CreateGamePage";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";

const socket = io("http://localhost:3000", { autoConnect: false });

function App() {
  const [name, setName] = useState("");
  console.log(name);
  //   useEffect(() => {
  //     socket.on("connection", (soc) => {
  //       socket.emit("join_to_room", "1020");
  //     });
  //   }, []);
  return (
    <div className="App">
      {/* <button
        onClick={() => {
          socket.disconnect();
        }}
      >
        disconnect
      </button>
      <button
        onClick={() => {
          socket.connect();
        }}
      >
        connect
      </button> */}
      <Routes>
        <Route path="/" element={<CreateGamePage name={name} />} />
        <Route path="/login/:gameId?" element={<LoginPage name={name} setName={setName} />} />
        <Route path="game/:gameId" element={<GamePage name={name} />} />
      </Routes>
    </div>
  );
}

export default App;
