import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import uuid from "short-uuid";
import { socket } from "../App";

export default function CreateGamePage({ name }: { name: string }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!name) {
      navigate("/login");
    }
  }, []);

  const [activeUserGame, setActiveUserGame] = useState<string>("");

  useEffect(() => {
    socket.emit("user active game");
  }, []);

  socket.on("user active game", (gameId: string) => {
    setActiveUserGame(gameId);
  });

  return (
    <div>
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {activeUserGame && (
          <>
            <Typography variant="h6" gutterBottom>
              Вы уже в игре
            </Typography>
            <Button
              sx={{ mb: 2 }}
              variant="contained"
              onClick={() => {
                navigate(`/game/${activeUserGame}`);
              }}
            >
              Вернуться в игру
            </Button>
          </>
        )}
        <Box>
          <Button
            variant="contained"
            disabled={!!activeUserGame}
            onClick={() => {
              navigate(`/game/${uuid.generate()}`);
            }}
          >
            Создать игру
          </Button>
        </Box>
      </Box>
    </div>
  );
}
