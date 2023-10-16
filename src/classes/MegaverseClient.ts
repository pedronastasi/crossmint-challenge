import { AxiosInstance, AxiosResponse } from "axios";
import {
  CandidateMap,
  AstralObjectProps,
  GoalMap,
  SoloonProps,
  ComethProps,
  PolyanetProps,
} from "./types";
import { customAxiosInstance } from "../customAxiosInstance";

export class MegaverseClient {
  private axiosInstance: AxiosInstance;
  private static candidateId: string = "b9c2728c-0ae2-450c-a0fb-975ff55d62a3";

  constructor() {
    this.axiosInstance = customAxiosInstance;
  }

  async createPolyanets({ row, column }: PolyanetProps) {
    console.log(`creating polyanet at row ${row} and column ${column}`);
    const response = await this.axiosInstance.post<{}>("/polyanets", {
      row,
      column,
      candidateId: MegaverseClient.candidateId,
    });

    return response;
  }

  async createSoloons({ row, column, color }: SoloonProps) {
    console.log(
      `creating soloons at row ${row} and column ${column} with color ${color}`
    );

    const response = await this.axiosInstance.post<{}>("/soloons", {
      row,
      column,
      color: color,
      candidateId: MegaverseClient.candidateId,
    });

    return response;
  }

  async createCometh({ row, column, direction }: ComethProps) {
    console.log(
      `creating cometh at row ${row} and column ${column} with direction ${direction}`
    );
    const response = await this.axiosInstance.post<{}>("/comeths", {
      row,
      column,
      direction,
      candidateId: MegaverseClient.candidateId,
    });

    return response;
  }

  async deleteAstralObject({ row, column, type }: AstralObjectProps) {
    console.log(`Deleting polyanet at row ${row} and column ${column}`);

    switch (type) {
      case 0:
        return await this.axiosInstance.delete<{}>("/polyanets", {
          data: {
            row,
            column,
            candidateId: MegaverseClient.candidateId,
          },
        });

      case 1:
        return await this.axiosInstance.delete<{}>("/soloons", {
          data: {
            row,
            column,
            candidateId: MegaverseClient.candidateId,
          },
        });

      case 2:
        return await this.axiosInstance.delete<{}>("/comeths", {
          data: {
            row,
            column,
            candidateId: MegaverseClient.candidateId,
          },
        });

      default:
        throw new Error("Invalid type for astral object");
    }
  }

  async getContentCandidateMap() {
    const response = await this.axiosInstance.get<CandidateMap>(
      `map/${MegaverseClient.candidateId}`
    );

    return response.data.map.content;
  }

  async getGoalMap() {
    const { data } = await this.axiosInstance.get<GoalMap>(
      `map/${MegaverseClient.candidateId}/goal`
    );

    return data.goal;
  }
}
