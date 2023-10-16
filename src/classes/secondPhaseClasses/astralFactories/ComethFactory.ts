import { goalComethsToCandidateMap } from "../../../goalComethsToCandidateMap";
import { MegaverseClient } from "../../MegaverseClient";
import {
  AstralObjectFactory,
  AstralObjectFactoryProps,
  GoalElement,
  Map,
} from "../../types";

export class ComethFactory implements AstralObjectFactory {
  private megaverseClient: MegaverseClient;
  private goal: GoalElement[][];
  private candidateMap: Map["content"];

  constructor({
    MegaverseClient,
    goal,
    candidateMap,
  }: AstralObjectFactoryProps) {
    this.megaverseClient = MegaverseClient;
    this.goal = goal;
    this.candidateMap = candidateMap;
  }
  async create() {
    console.log("creating comeths");
    await Promise.all(
      this.goal.map(async (row, rowIndex) => {
        return await Promise.all(
          row.map((column, columIndex) => {
            if (
              column === GoalElement.DownCometh ||
              column === GoalElement.LeftCometh ||
              column === GoalElement.RightCometh ||
              column === GoalElement.UpCometh
            ) {
              if (this.candidateMap[rowIndex][columIndex]?.type !== 2) {
                const direction = goalComethsToCandidateMap[column].direction;

                return this.megaverseClient.createCometh({
                  row: rowIndex,
                  column: columIndex,
                  direction,
                });
              }
            }
          })
        );
      })
    );
  }
}
