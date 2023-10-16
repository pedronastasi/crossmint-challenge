import { CreateAstralObjectStrategy } from "./CreateAstralObjectsStrategy";
import { DeleteAstralObjectsStrategy } from "./DeleteAstralObjectsStrategy";
import { MegaverseClient } from "../../MegaverseClient";

export class AstralObjectStrategyManipulator {
  private strategy: CreateAstralObjectStrategy | DeleteAstralObjectsStrategy;
  constructor(
    strategy: CreateAstralObjectStrategy | DeleteAstralObjectsStrategy
  ) {
    this.strategy = strategy;
  }

  static async fromConfig(strategy: "restartMegaverse" | "createMegaverse") {
    const megaverseClient = new MegaverseClient();
    const goal = await megaverseClient.getGoalMap();
    const candidateMap = await megaverseClient.getContentCandidateMap();

    if (strategy === "restartMegaverse") {
      return new AstralObjectStrategyManipulator(
        new DeleteAstralObjectsStrategy(megaverseClient)
      );
    }

    return new AstralObjectStrategyManipulator(
      CreateAstralObjectStrategy.fromConfig({
        goal,
        candidateMap,
        megaverseClient,
      })
    );
  }

  async executeStrategy() {
    await this.strategy.execute();
  }
}
