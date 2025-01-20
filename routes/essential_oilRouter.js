import express from "express";

import {
  getEssential_oils,
  getEssential_oil,
  createEssential_oil,
  updateEssential_oil,
  deleteEssential_oil,
} from "../controladores/control_essential_oil.js";

const router = express.Router();

router.get("/essential_oils", getEssential_oils);
router.get("/essential_oil", getEssential_oil);
router.post("/essential_oil", createEssential_oil);
router.put("/essential_oil", updateEssential_oil);
router.delete("/essential_oil", deleteEssential_oil);

export default router;
