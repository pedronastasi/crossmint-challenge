import { MegaverseClient } from "../MegaverseClient";
import { Content, GoalElement } from "../types";

export class MegaVerseBuilder {
  private megaverseClient: MegaverseClient;
  constructor() {
    this.megaverseClient = new MegaverseClient();
  }

  async createMegaverse() {
    const goal = await this.megaverseClient.getGoalMap();
    const isMatch = await this.checkIfCandidateMapMatchesGoalMap(goal);

    if (isMatch) {
      console.log("Megaverse already created");
      return;
    }
    await this.createPolyanets(goal);

    await this.createMegaverse();
  }

  async restartMegaverse() {
    let content = await this.megaverseClient.getContentCandidateMap();
    const isEmpty = await this.checkIfCandidateMapIsEmpty(content);
    if (isEmpty) {
      console.log("Megaverse is empty");
      return;
    }
    await this.deletePolyanets(content);

    await this.restartMegaverse();
  }

  private async createPolyanets(goal: GoalElement[][]) {
    return await Promise.all(
      goal.map(async (row, rowIndex) => {
        return await Promise.all(
          row.map((colum, columIndex) => {
            if (colum === "POLYANET") {
              return this.megaverseClient.createPolyanets({
                row: rowIndex,
                column: columIndex,
              });
            }
          })
        );
      })
    );
  }

  private async deletePolyanets(content: (Content | null)[][]) {
    return await Promise.all(
      content.map(async (row, rowIndex) => {
        return await Promise.all(
          row.map((colum, columIndex) => {
            if (colum !== null) {
              return this.megaverseClient.deleteAstralObject({
                row: rowIndex,
                column: columIndex,
                type: colum.type,
              });
            }
          })
        );
      })
    );
  }

  private async checkIfCandidateMapMatchesGoalMap(goal: GoalElement[][]) {
    console.log("checking if candidate map matches goal map");
    const candidateMap = await this.megaverseClient.getContentCandidateMap();

    const isMatch = goal.every((row, rowIndex) => {
      return row.every((colum, columIndex) => {
        if (colum === GoalElement.Polyanet) {
          if (candidateMap[rowIndex][columIndex] === null) return false;
        }
        if (colum === GoalElement.Space) {
          if (candidateMap[rowIndex][columIndex] !== null) return false;
        }
        return true;
      });
    });

    return isMatch;
  }

  private async checkIfCandidateMapIsEmpty(content: (Content | null)[][]) {
    console.log("checking if candidate map is empty");
    const isEmpty = content.every((row) => {
      return row.every((colum) => {
        return colum === null;
      });
    });

    return isEmpty;
  }
}
