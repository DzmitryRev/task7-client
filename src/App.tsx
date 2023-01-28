import { Alert, Box, Typography } from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import useNotification from "./hooks/useNotification";
import CreateGamePage from "./pages/CreateGamePage";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";

export const socket = io("https://task7-server.onrender.com", {
  autoConnect: false,
  transports: ["websocket"],
});

function App() {
  const [name, setName] = useState("");
  const { notification, setNotification } = useNotification();

  return (
    <Box sx={{ maxWidth: "998px", m: "0 auto", px: 3 }}>
      <Box sx={{ py: 2, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" gutterBottom>
          Tic Tac Toe
        </Typography>
        <Typography variant="h5" gutterBottom>
          {name}
        </Typography>
      </Box>
      <Routes>
        <Route path="/" element={<CreateGamePage name={name} />} />
        <Route path="/login/:gameId?" element={<LoginPage name={name} setName={setName} />} />
        <Route
          path="game/:gameId"
          element={<GamePage name={name} setNotification={setNotification} />}
        />
      </Routes>
      {notification && (
        <Alert sx={{ position: "absolute", bottom: "30px", right: "30px" }} severity="error">
          {notification}
        </Alert>
      )}
    </Box>
  );
}

export default App;
