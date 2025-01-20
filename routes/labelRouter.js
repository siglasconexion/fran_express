import express from "express";

import {
  getLabels,
  getLabel,
  createLabel,
  updateLabel,
  deleteLabel,
} from "../controladores/control_label.js";

const router = express.Router();

router.get("/labels", getLabels);
router.get("/label", getLabel);
router.post("/label", createLabel);
router.put("/label", updateLabel);
router.delete("/label", deleteLabel);

export default router;
