import { Router } from "express";
import { MegaVerseBuilder } from "../../classes/firstPhaseClasses/MegaVerseBuilder";

const router = Router();

router.post("/", async (__req, res, next) => {
  const megaverseBuilder = new MegaVerseBuilder();

  try {
    await megaverseBuilder.restartMegaverse();
    await megaverseBuilder.createMegaverse();

    res.json({
      message: "Megaverse created succesfully",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
