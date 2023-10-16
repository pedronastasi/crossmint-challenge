import { ComethFactory } from "../astralFactories/ComethFactory";
import { MegaverseClient } from "../../MegaverseClient";
import { PolyanetFactory } from "../astralFactories/PolyanetsFactory";
import { SoloonFactory } from "../astralFactories/SoloonsFactory";
import {
  AstralObjectFactory,
  AstralObjectStrategy,
  CreateAstralObjectsStrategyProps,
  GoalElement,
  Map,
} from "../../types";
import { goalMapToCandidateMap } from "../../../candidateMapToGoalMap";

export class CreateAstralObjectStrategy implements AstralObjectStrategy {
  private astralObjectsFactories: AstralObjectFactory[] = [];
  private megaverseClient: MegaverseClient;
  private goal: GoalElement[][];
  static missingAstralObjects: GoalElement[] = [];

  constructor({
    astralObjectsFactories,
    megaverseClient,
    goal,
  }: CreateAstralObjectsStrategyProps) {
    this.astralObjectsFactories = astralObjectsFactories;
    this.megaverseClient = megaverseClient;
    this.goal = goal;
  }

  static fromConfig({
    goal,
    megaverseClient,
  }: {
    goal: GoalElement[][];
    megaverseClient: MegaverseClient;
    candidateMap: Map["content"];
  }) {
    let astralObjectsFactories: AstralObjectFactory[] = [];

    goal.forEach((row) => {
      row.forEach((column) => {
        if (column === GoalElement.Polyanet) {
          if (
            astralObjectsFactories.find(
              (factory) => factory instanceof PolyanetFactory
            )
          )
            return;
          astralObjectsFactories.push(
            new PolyanetFactory({
              MegaverseClient: megaverseClient,
              goal,
            })
          );
        }
        if (
          column === GoalElement.BlueSoloon ||
          column === GoalElement.RedSoloon ||
          column === GoalElement.PurpleSoloon ||
          column === GoalElement.WhiteSoloon
        ) {
          if (
            astralObjectsFactories.find(
              (factory) => factory instanceof SoloonFactory
            )
          )
            return;
          astralObjectsFactories.push(
            new SoloonFactory({
              MegaverseClient: megaverseClient,
              goal,
            })
          );
        }
        if (
          column === GoalElement.DownCometh ||
          column === GoalElement.LeftCometh ||
          column === GoalElement.RightCometh ||
          column === GoalElement.UpCometh
        ) {
          if (
            astralObjectsFactories.find(
              (factory) => factory instanceof ComethFactory
            )
          )
            return;
          astralObjectsFactories.push(
            new ComethFactory({
              MegaverseClient: megaverseClient,
              goal,
            })
          );
        }
      });
    });

    return new CreateAstralObjectStrategy({
      astralObjectsFactories,
      megaverseClient,
      goal,
    });
  }

  async execute() {
    const isMatch = await this.checkIfCandidateMapMatchesGoalMap(this.goal);

    if (isMatch) {
      console.log("Megaverse already created");
      return;
    }

    await Promise.all(
      this.astralObjectsFactories.map((factory) => {
        factory.create();
      })
    );

    await this.execute();
  }

  private async checkIfCandidateMapMatchesGoalMap(goal: GoalElement[][]) {
    console.log("checking if candidate map matches goal map");
    const contentCandidateMap =
      await this.megaverseClient.getContentCandidateMap();

    const isMatch = goal.every((goalRow, goalRowIndex) => {
      return goalRow.every((goalColum, goalColumIndex) => {
        let isMatch = true;

        if (
          goalColum !== GoalElement.Space &&
          contentCandidateMap[goalRowIndex][goalColumIndex] === null
        ) {
          isMatch = false;
        }

        if (
          contentCandidateMap[goalRowIndex][goalColumIndex]?.type !==
          goalMapToCandidateMap[goalColum]?.type
        ) {
          isMatch = false;
        }

        if (
          goalColum === GoalElement.Space &&
          contentCandidateMap[goalRowIndex][goalColumIndex] !== null
        ) {
          isMatch = false;
        }

        return isMatch;
      });
    });

    return isMatch;
  }
}
