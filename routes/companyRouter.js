import express from "express";

import {
  getCompanys,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} from "./controladores/control_company.js";

const router = express.Router();

router.get("/companys", getCompanys);
router.get("/company", getCompany);
router.post("/company", createCompany);
router.put("/company", updateCompany);
router.delete("/company", deleteCompany);

export default router;
