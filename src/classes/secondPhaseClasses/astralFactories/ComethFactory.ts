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

  constructor({ MegaverseClient, goal }: AstralObjectFactoryProps) {
    this.megaverseClient = MegaverseClient;
    this.goal = goal;
  }
  async create() {
    console.log("creating comeths");
    const candidateMap = await this.megaverseClient.getContentCandidateMap();

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
              if (candidateMap[rowIndex][columIndex]?.type !== 2) {
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
