import express from "express";

import {
  getProviders,
  getProvider,
  createProvider,
  updateProvider,
  deleteProvider,
} from "../controladores/control_provider.js";

const router = express.Router();

router.get("/providers", getProviders);
router.get("/provider", getProvider);
router.post("/provider", createProvider);
router.put("/provider", updateProvider);
router.delete("/provider", deleteProvider);

export default router;
