import express from 'express';
import { 
  getFamilys,
  getFamily,
  createFamily,
  updateFamily,
  deleteFamily,
  getUserQuerySql,
  getDataExcel,
 } from '../controladores/control_family.js';

const router = express.Router();

router.get("/familys", getFamilys);
router.get("/family", getFamily);
router.post("/family", createFamily);
router.put("/family", updateFamily);
router.delete("/family", deleteFamily);
router.get("/getDataExcel", getDataExcel);
router.get("/getUserQuerySql", getUserQuerySql);

export default router;
