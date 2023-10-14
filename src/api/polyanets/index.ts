import { Router } from "express";
import { MegaVerseBuilder } from "../../classes/MegaVerseBuilder";
import { AxiosError } from "axios";

const router = Router();

router.post("/", async (req, res) => {
  const megaverseBuilder = new MegaVerseBuilder();

  try {
    await megaverseBuilder.restartMegaverse();
    await megaverseBuilder.createMegaverse();

    res.json({
      message: "Megaverse created succesfully",
    });
  } catch (error) {
    console.log((error as AxiosError).response?.status);
    console.log((error as AxiosError).response?.statusText);

    if ((error as AxiosError).message) {
      return res
        .status((error as AxiosError).status || 500)
        .json({ message: (error as AxiosError).message });
    }
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
