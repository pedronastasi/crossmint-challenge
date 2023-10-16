import express, { NextFunction, Request, Response } from "express";
import apiRoutes from "./api/routes";
import axios, { AxiosError } from "axios";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/goal", async (req: Request, res: Response) => {
  const response = await axios.get(
    "https://challenge.crossmint.io/api/map/b9c2728c-0ae2-450c-a0fb-975ff55d62a3/goal"
  );
  res.send(response.data);
});

app.use("/api", apiRoutes);

app.use((error: Error, __req: Request, res: Response) => {
  console.log((error as AxiosError).response?.status);
  console.log((error as AxiosError).response?.statusText);

  if ((error as AxiosError).message) {
    return res
      .status((error as AxiosError).status || 500)
      .json({ message: (error as AxiosError).message });
  }
  res.status(500).json({ message: "Something went wrong", error });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
