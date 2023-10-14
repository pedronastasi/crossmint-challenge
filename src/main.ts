import express, { NextFunction, Request, Response } from "express";
import apiRoutes from "./api/routes";
import axios from "axios";

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

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
