import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", { autoConnect: false });

export default function GamePage({ name }: { name: string }) {
  const { gameId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) {
      navigate(`/login/${gameId}`);
    }
  }, []);

  const [connected, setConnected] = useState(false);

  const [playerOneName, setPlayerOneName] = useState(null); // owner (have function to destroy room)
  const [playerTwoName, setPlayerTwoName] = useState(null);

  const [move, setMove] = useState<string>(); // "Player1" || "Player2"
  const [winner, setWinner] = useState(null); // "Player1" || "Player2" || "Ничья"

  useEffect(() => {
    if (name) {
      socket.connect();
      socket.emit("join", { gameId, name });
      //   setConnected(true);
    }
  }, []);

  //   useEffect(() => {
  //     socket.on("connection", (socket) => {});
  //   }, [connected]);

  socket.on("get game", (game) => {
    console.log(game);
  });

  // Взять имена игроков с сервера! Потом:
  useEffect(() => {
    // if(!1 || name !== 1) == занять
    // else if(!2 || name !== 1) == занять
    // else redirect
  }, []);

  // connect to game

  return (
    <div>
      {/* <button
        onClick={() => {
          socket.emit("get game", gameId);
        }}
      >
        get game
      </button> */}
      {/* room link */}
      {/* player 1 name; online marker; if move === p1 == marker */}
      {/* game */}
      {/* player 2 name; online marker; if move === p2 == marker */}
      {/* if winner = botton new game == enable, else == disable */}
    </div>
  );
}
