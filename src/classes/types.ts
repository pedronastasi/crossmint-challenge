import { MegaverseClient } from "./MegaverseClient";

export interface AstralObjectProps {
  column: number;
  row: number;
  type: Content["type"];
}

export interface PolyanetProps {
  column: number;
  row: number;
}

export interface SoloonProps {
  column: number;
  row: number;
  color: Color;
}

export interface ComethProps {
  column: number;
  row: number;
  direction: Direction;
}

export interface CandidateMap {
  map: Map;
}

export interface Map {
  _id: string;
  content: (Content | null)[][];
  candidateId: string;
  phase: number;
  __v: number;
}

export interface Content {
  type: 0 | 1 | 2;
  color?: Color;
  direction?: Direction;
}

export type Color = "blue" | "red" | "purple" | "white";
export type Direction = "up" | "down" | "left" | "right";

export interface GoalMap {
  goal: GoalElement[][];
}

export enum GoalElement {
  BlueSoloon = "BLUE_SOLOON",
  DownCometh = "DOWN_COMETH",
  LeftCometh = "LEFT_COMETH",
  Polyanet = "POLYANET",
  PurpleSoloon = "PURPLE_SOLOON",
  RedSoloon = "RED_SOLOON",
  RightCometh = "RIGHT_COMETH",
  Space = "SPACE",
  UpCometh = "UP_COMETH",
  WhiteSoloon = "WHITE_SOLOON",
}

export interface AstralObjectStrategy {
  execute: () => Promise<void>;
}

export interface AstralObjectFactory {
  create: () => Promise<void>;
}

export type GoalMapToCandidateMap = {
  [key in GoalElement]: {
    type: 0 | 1 | 2;
    color?: Color;
    direction?: Direction;
  } | null;
};

export interface CreateAstralObjectsStrategyProps {
  astralObjectsFactories: AstralObjectFactory[];
  megaverseClient: MegaverseClient;
  goal: GoalElement[][];
}

export type GoalComethsToCandidateMap = Record<
  | GoalElement.UpCometh
  | GoalElement.DownCometh
  | GoalElement.LeftCometh
  | GoalElement.RightCometh,
  {
    type: 2;
    direction: Direction;
  }
>;

export type GoalSoloonsToCandidateMap = Record<
  | GoalElement.RedSoloon
  | GoalElement.WhiteSoloon
  | GoalElement.BlueSoloon
  | GoalElement.PurpleSoloon,
  {
    type: 1;
    color: Color;
  }
>;

export interface AstralObjectFactoryProps {
  MegaverseClient: MegaverseClient;
  goal: GoalElement[][];
}
