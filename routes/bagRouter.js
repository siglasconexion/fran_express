import express from "express";

import {
  getBags,
  getBag,
  createBag,
  updateBag,
  deleteBag,
} from "../controladores/control_bag.js";

const router = express.Router();

router.get("/bags", getBags);
router.get("/bag", getBag);
router.post("/bag", createBag);
router.put("/bag", updateBag);
router.delete("/bag", deleteBag);

export default router;
