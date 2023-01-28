import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { socket } from "../App";

interface ILoginPageProps {
  name: string;
  setName: (name: string) => void;
}

export default function LoginPage({ name, setName }: ILoginPageProps) {
  const { gameId } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    if (name) {
      if (gameId) {
        navigate(`/game/${gameId}`);
      } else {
        navigate("/");
      }
    }
  }, [name]);

  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.length) {
      setError("Имя обазательно");
      return;
    }
    socket.auth = { username: inputValue };
    socket.connect();
  };

  socket.on("login", () => {
    setName(inputValue);
  });

  socket.on("connect_error", (err) => {
    setError(err.message);
  });

  return (
    <Box
      sx={{ minHeight: "60vh", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <form onSubmit={submit}>
        <TextField
          sx={{ mb: 2 }}
          name="name"
          label={error || "Имя"}
          value={inputValue}
          error={!!error}
          onChange={(e) => {
            setError("");
            setInputValue(e.target.value);
          }}
          autoComplete="off"
        />
        <Box>
          <Button variant="contained" type="submit">
            Войти
          </Button>
        </Box>
      </form>
    </Box>
  );
}
