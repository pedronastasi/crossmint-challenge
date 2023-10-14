import { Router } from "express";
import polyanetsRouter from "./polyanets";
import restartMegaverseRouter from "./megaverseRestarter";

const router = Router();

router.use("/polyanets", polyanetsRouter);
router.use("/restart-megaverse", restartMegaverseRouter);

export default router;
