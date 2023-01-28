import { GameBoardStateType } from "./GameBoardModel";
import { IPlayer } from "./PlayerModel";

export interface IGame {
  gameId: string;
  playerOne: IPlayer;
  playerTwo: IPlayer | null;
  move: "X" | "O";
  result: string | null;
  gameBoardState: GameBoardStateType;
}
