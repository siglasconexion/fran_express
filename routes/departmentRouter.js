import express from "express";

import {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controladores/control_department.js";

const router = express.Router();

router.get("/departments", getDepartments);
router.get("/department", getDepartment);
router.post("/department", createDepartment);
router.put("/department", updateDepartment);
router.delete("/department", deleteDepartment);

export default router;
