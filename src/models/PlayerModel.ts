import { MarkerType } from "./MarkerModel";

export interface IPlayer {
  name: string;
  marker: MarkerType;
  isOnline: boolean;
}
