import { AxiosInstance } from "axios";
import { CandidateMap, Coordenates, GoalMap } from "./types";
import { customAxiosInstance } from "../customAxiosInstance";

export class MegaverseClient {
  private axiosInstance: AxiosInstance;
  private static candidateId: string = "b9c2728c-0ae2-450c-a0fb-975ff55d62a3";

  constructor() {
    this.axiosInstance = customAxiosInstance;
  }

  async createPolyanets({ row, column }: Coordenates) {
    console.log(`creating polyanet at row ${row} and column ${column}`);
    const response = await this.axiosInstance.post<{}>("/polyanets", {
      row,
      column,
      candidateId: MegaverseClient.candidateId,
    });

    return response;
  }

  async deletePolyanets({ row, column }: Coordenates) {
    console.log(`Deleting polyanet at row ${row} and column ${column}`);
    const response = await this.axiosInstance.delete<{}>("/polyanets", {
      data: {
        row,
        column,
        candidateId: MegaverseClient.candidateId,
      },
    });

    return response;
  }

  async getCandidateMap() {
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
