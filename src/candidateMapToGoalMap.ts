import { GoalMapToCandidateMap, GoalElement } from "./classes/types";

export const goalMapToCandidateMap: GoalMapToCandidateMap = {
  [GoalElement.BlueSoloon]: {
    type: 1,
    color: "blue",
  },
  [GoalElement.RedSoloon]: {
    type: 1,
    color: "red",
  },
  [GoalElement.PurpleSoloon]: {
    type: 1,
    color: "purple",
  },
  [GoalElement.WhiteSoloon]: {
    type: 1,
    color: "white",
  },
  [GoalElement.UpCometh]: {
    type: 2,
    direction: "up",
  },
  [GoalElement.DownCometh]: {
    type: 2,
    direction: "down",
  },
  [GoalElement.LeftCometh]: {
    type: 2,
    direction: "left",
  },
  [GoalElement.RightCometh]: {
    type: 2,
    direction: "right",
  },
  [GoalElement.Polyanet]: {
    type: 0,
  },
  [GoalElement.Space]: null,
};
