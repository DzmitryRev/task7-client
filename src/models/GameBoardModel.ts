import { MarkerType } from "./MarkerModel";

type GameBoardCellType = MarkerType | "";

type GameBoardRowType = [GameBoardCellType, GameBoardCellType, GameBoardCellType];

export type GameBoardStateType = [GameBoardRowType, GameBoardRowType, GameBoardRowType];
