export interface Coordenates {
  column: number;
  row: number;
}

export interface GoalMap {
  goal: GoalElement[][];
}

export enum GoalElement {
  Polyanet = "POLYANET",
  Space = "SPACE",
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
  type: number;
}
