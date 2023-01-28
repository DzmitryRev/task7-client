import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import uuid from "short-uuid";
import { styled } from "@mui/material";
import { GameBoardStateType } from "../models/GameBoardModel";

interface IGameBoardProps {
  gameState: GameBoardStateType;
  moveAction(cellIndex: { pos: number; row: number }): void;
}

const Cell = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(1),
  ...theme.typography.body2,
  fontSize: 40,
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "85px",
  height: "85px",
  border: "1px solid black",
}));

export default function GameBoard({
  gameState = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  moveAction,
}: IGameBoardProps) {
  return (
    <Box>
      {gameState.map((row, rowIndex) => {
        return (
          <Grid
            key={uuid.generate()}
            container
            spacing={1}
            sx={{ justifyContent: "center", mb: 1 }}
          >
            {row.map((cell, cellIndex) => {
              return (
                <Grid key={uuid.generate()} item>
                  <Cell
                    onClick={() => {
                      moveAction({ pos: cellIndex, row: rowIndex });
                    }}
                  >
                    {cell}
                  </Cell>
                </Grid>
              );
            })}
          </Grid>
        );
      })}
    </Box>
  );
}
