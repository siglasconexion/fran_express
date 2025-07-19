import express from "express";

import {
  getTools,
  getTool,
  createTool,
  updateTool,
  deleteTool,
} from "../controladores/control_tool.js";

const router = express.Router();

router.get("/tools", getTools);
router.get("/tool", getTool);
router.post("/tool", createTool);
router.put("/tool", updateTool);
router.delete("/tool", deleteTool);

export default router;
