import axios from "axios";
import axiosRetry, { exponentialDelay } from "axios-retry";
const { ConcurrencyManager } = require("axios-concurrency");

export const customAxiosInstance = axios.create({
  baseURL: "https://challenge.crossmint.io/api/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

ConcurrencyManager(customAxiosInstance, 1);

axiosRetry(customAxiosInstance, {
  retries: 20,
  retryDelay: (retryCount, error) => {
    console.log(retryCount);
    const delay = exponentialDelay(retryCount);
    console.log("delay", delay);
    return delay;
  },
  retryCondition: (error) => {
    return error.response?.status === 429;
  },
  shouldResetTimeout: true,
  onRetry: (retryCount, error, requestConfig) => {
    console.log("retrying", retryCount);
    console.log("checking condition", error.response?.status);
    console.log("response", error.response?.config.data);
    console.log("data", error.response?.data);
  },
});
