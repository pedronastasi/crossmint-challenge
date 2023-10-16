import { GoalComethsToCandidateMap, GoalElement, GoalSoloonsToCandidateMap } from "./classes/types";

export const goalComethsToCandidateMap: GoalComethsToCandidateMap = {
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
};

