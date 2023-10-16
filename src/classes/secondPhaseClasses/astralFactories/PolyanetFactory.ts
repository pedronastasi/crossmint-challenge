import { MegaverseClient } from "../../MegaverseClient";
import {
  AstralObjectFactory,
  AstralObjectFactoryProps,
  GoalElement,
  Map,
} from "../../types";

export class PolyanetFactory implements AstralObjectFactory {
  private megaverseClient: MegaverseClient;
  private goal: GoalElement[][];

  constructor({ MegaverseClient, goal }: AstralObjectFactoryProps) {
    this.megaverseClient = MegaverseClient;
    this.goal = goal;
  }
  async create() {
    console.log("creating polyanets");

    const candidateMap = await this.megaverseClient.getContentCandidateMap();

    await Promise.all(
      this.goal.map(async (goalRow, goalRowIndex) => {
        return await Promise.all(
          goalRow.map(async (goalColum, goalColumIndex) => {
            if (goalColum === "POLYANET") {
              if (candidateMap[goalRowIndex][goalColumIndex]?.type !== 0) {
                return await this.megaverseClient.createPolyanets({
                  row: goalRowIndex,
                  column: goalColumIndex,
                });
              }
            }
          })
        );
      })
    );
  }
}
