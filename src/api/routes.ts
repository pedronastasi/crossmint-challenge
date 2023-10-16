import { Router } from "express";
import firstPhase from "./firstPhase";
import secondPahase from "./secondPhase";

const router = Router();

router.use("/first-phase", firstPhase);
router.use("/second-phase", secondPahase);

export default router;
