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
    console.log("creating polyanets");
    await Promise.all(
      this.goal.map(async (goalRow, goalRowIndex) => {
        return await Promise.all(
          goalRow.map(async (goalColum, goalColumIndex) => {
            if (goalColum === "POLYANET") {
              if (this.candidateMap[goalRowIndex][goalColumIndex]?.type !== 0) {
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
