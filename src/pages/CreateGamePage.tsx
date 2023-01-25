import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import uuid from "short-uuid";

export default function CreateGamePage({ name }: { name: string }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!name) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <Box>
        <Button
          variant="contained"
          onClick={() => {
            navigate(`/game/${uuid.generate()}`);
          }}
        >
          Create game
        </Button>
      </Box>
    </div>
  );
}
