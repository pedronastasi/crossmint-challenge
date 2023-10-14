import axios from "axios";
import axiosRetry from "axios-retry";

export const customAxiosInstance = axios.create({
  baseURL: "https://challenge.crossmint.io/api/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

axiosRetry(customAxiosInstance, {
  retries: 20,
  retryDelay: (retryCount) => {
    console.log(retryCount);
    const delay = 150 * Math.pow(2, retryCount);
    console.log("delay", delay);
    return delay;
  },
  retryCondition: (error) => {
    return error.response?.status === 429;
  },
  shouldResetTimeout: true,
  onRetry: (retryCount, error, requestConfig) => {
    console.log("retrying", retryCount)
    // console.log('requestConfig', requestConfig)
    console.log("checking condition", error.response?.status);
    console.log("response", error.response?.config.data);
    console.log("data", error.response?.data);
  },
});
