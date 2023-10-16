import { goalSoloonsToCandidateMap } from "../../../goalSoloonsToCandidateMap";
import { MegaverseClient } from "../../MegaverseClient";
import {
  AstralObjectFactory,
  AstralObjectFactoryProps,
  GoalElement,
  Map,
} from "../../types";

export class SoloonFactory implements AstralObjectFactory {
  private megaverseClient: MegaverseClient;
  private goal: GoalElement[][];

  constructor({ MegaverseClient, goal }: AstralObjectFactoryProps) {
    this.megaverseClient = MegaverseClient;
    this.goal = goal;
  }
  async create() {
    console.log("creating soloons");

    const candidateMap = await this.megaverseClient.getContentCandidateMap();

    await Promise.all(
      this.goal.map(async (row, rowIndex) => {
        return await Promise.all(
          row.map((column, columIndex) => {
            if (
              column === GoalElement.BlueSoloon ||
              column === GoalElement.RedSoloon ||
              column === GoalElement.PurpleSoloon ||
              column === GoalElement.WhiteSoloon
            ) {
              if (candidateMap[rowIndex][columIndex]?.type !== 1) {
                const color = goalSoloonsToCandidateMap[column].color;

                return this.megaverseClient.createSoloons({
                  row: rowIndex,
                  column: columIndex,
                  color,
                });
              }
            }
          })
        );
      })
    );
  }
}
