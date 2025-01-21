import express from 'express';
import {
  getStatus,
  getStatu,
  createStatu,
  updateStatu,
  deleteStatu,
} from '../controladores/control_statu.js';

const router = express.Router();

router.get("/status", getStatus);
router.get("/statu", getStatu);
router.post("/statu", createStatu);
router.put("/statu", updateStatu);
router.delete("/statu", deleteStatu);

export default router;
