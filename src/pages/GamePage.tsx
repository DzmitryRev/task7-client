import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { socket } from "../App";
import GameBoard from "../components/GameBoard";
import GameUserInfoRow from "../components/GameUserInfoRow";
import { IPlayer } from "../models/PlayerModel";
import { IGame } from "../models/GameModel";
import { exceptions } from "../exceptions/exceptions";

interface IGameProps {
  name: string;
  setNotification: (message: string) => void;
}

export default function GamePage({ name, setNotification }: IGameProps) {
  const { gameId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) {
      navigate(`/login/${gameId}`);
    }
  }, []);

  const [gameState, setGameState] = useState<IGame | null>(null);
  const [player, setPlayer] = useState<IPlayer | null>(null);

  useEffect(() => {
    if (gameState) {
      if (gameState.playerOne.name === name) {
        setPlayer(gameState.playerOne);
      } else if (gameState.playerTwo && gameState.playerTwo.name === name) {
        setPlayer(gameState.playerTwo);
      }
    }
  }, [gameState]);

  useEffect(() => {
    if (name) {
      socket.emit("connect to game", gameId);
    }
  }, []);

  socket.on("connect to game", (game: IGame) => {
    setGameState(game);
    socket.emit("game move", gameId);
  });

  socket.on("game action", (game: IGame) => {
    setGameState(game);
  });

  socket.on("destroy game", () => {
    setNotification("Игра закрыта");
    navigate("/login");
  });

  socket.on("exception", (err) => {
    if (err === exceptions.HaveNotAcessToGame || err === exceptions.YouAlredyInGame) {
      setNotification(err);
      navigate("/");
    }
  });

  return (
    <div>
      {gameState?.playerOne.name === name && !gameState?.playerTwo && (
        <Box
          sx={{
            mb: 2,
          }}
        >
          <Typography variant="subtitle1">Поделитесь этой ссылкой:</Typography>
          <Typography variant="subtitle2">localhost:5173/game/{gameId}</Typography>
        </Box>
      )}
      <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Button
          variant="contained"
          type="button"
          color="error"
          onClick={() => {
            socket.emit("destroy game", gameId);
          }}
        >
          Покинуть игру
        </Button>
        {gameState?.result ? (
          <>
            <Button
              variant="contained"
              type="button"
              onClick={() => {
                socket.emit("reset game", gameId);
              }}
            >
              Обновить
            </Button>
            <Box>
              <Typography variant="subtitle1">Игра окончена</Typography>
              <Typography variant="subtitle2">Победитель: {gameState?.result}</Typography>
            </Box>
          </>
        ) : (
          <Typography
            variant="h5"
            sx={{
              display: "flex",
              alignItems: "center",
              p: "3px",
              lineHeight: "1.5rem",
            }}
          >
            Ходит {gameState?.move}
          </Typography>
        )}
      </Box>

      <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
        {gameState?.playerOne && (
          <GameUserInfoRow
            name={gameState.playerOne.name}
            marker={gameState.playerOne.marker}
            isOnline={gameState.playerOne.isOnline}
          />
        )}
      </Box>

      <Box>
        <GameBoard
          gameState={
            gameState?.gameBoardState || [
              ["", "", ""],
              ["", "", ""],
              ["", "", ""],
            ]
          }
          moveAction={(cellIndex: { pos: number; row: number }) => {
            if (
              !gameState?.result &&
              gameState?.move === player?.marker
            ) {
              socket.emit("game action", {
                gameId,
                move: { cellIndex, marker: player?.marker, gameState, name },
              });
            }
          }}
        />
      </Box>

      <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
        {gameState?.playerTwo && (
          <GameUserInfoRow
            name={gameState.playerTwo.name}
            marker={gameState.playerTwo.marker}
            isOnline={gameState.playerTwo.isOnline}
          />
        )}
      </Box>
    </div>
  );
}
