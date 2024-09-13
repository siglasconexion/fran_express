import express from "express";

import {
  getContainers,
  getContainer,
  createContainer,
  updateContainer,
  deleteContainer,
} from "./controladores/control_container.js";

const router = express.Router();
router.get("/containers", getContainers);
router.get("/container", getContainer);
router.post("/container", createContainer);
router.put("/container", updateContainer);
router.delete("/container", deleteContainer);
export default router;
