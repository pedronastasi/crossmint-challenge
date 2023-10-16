import { MegaverseClient } from "../../MegaverseClient";
import { AstralObjectStrategy, Content } from "../../types";

export class DeleteAstralObjectsStrategy implements AstralObjectStrategy {
  private megaverseClient: MegaverseClient;
  constructor(megaverseClient: MegaverseClient) {
    this.megaverseClient = megaverseClient;
  }

  async execute() {
    let content = await this.megaverseClient.getContentCandidateMap();
    const isEmpty = await this.checkIfCandidateMapIsEmpty(content);
    if (isEmpty) {
      console.log("Megaverse is empty");
      return;
    }
    await this.deleteAstralObjects(content);

    await this.execute();
  }

  private async deleteAstralObjects(content: (Content | null)[][]) {
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
