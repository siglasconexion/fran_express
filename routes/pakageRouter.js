import express from "express";

import {
  getPakages,
  getPakage,
  createPakage,
  updatePakage,
  deletePakage,
} from "../controladores/control_pakage.js";

const router = express.Router();

router.get("/pakages", getPakages);
router.get("/pakage", getPakage);
router.post("/pakage", createPakage);
router.put("/pakage", updatePakage);
router.delete("/pakage", deletePakage);

export default router;
