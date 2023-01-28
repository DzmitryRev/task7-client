import React from "react";
import { Box, Typography } from "@mui/material";
import { IPlayer } from "../models/PlayerModel";

type IGameUserInfoRowProps = IPlayer;

export default function GameUserInfoRow({ name, marker, isOnline }: IGameUserInfoRowProps) {
  return (
    <>
      <Box
        sx={{
          display: "inline-block",
          width: "15px",
          height: "15px",
          backgroundColor: isOnline ? "green" : "red",
          borderRadius: "50%",
          mr: 1,
        }}
      ></Box>
      <Typography variant="h4" sx={{ mr: 1 }}>
        {name}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid black",
          p: "3px",
          lineHeight: "1.5rem",
        }}
      >
        {marker}
      </Typography>
    </>
  );
}
