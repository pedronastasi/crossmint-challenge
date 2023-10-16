import { Router } from "express";
import { AxiosError } from "axios";
import { AstralObjectStrategyManipulator } from "../../classes/secondPhaseClasses/astralObjectStrategies/AstralObjectManipulator";

const router = Router();

router.post("/", async (__req, res, next) => {
  const megaverseRestarter = await AstralObjectStrategyManipulator.fromConfig(
    "restartMegaverse"
  );

  const megaverseBuilder = await AstralObjectStrategyManipulator.fromConfig(
    "createMegaverse"
  );

  try {
    await megaverseRestarter.executeStrategy();
    await megaverseBuilder.executeStrategy();

    res.json({
      message: "Megaverse created succesfully",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
