import express from "express";

import {
  getType_recharges,
  getType_recharge,
  createType_recharge,
  updateType_recharge,
  deleteType_recharge,
  getType_rechargeQuerySql2,
} from "../controladores/control_type_recharge.js";

const router = express.Router();

//router.get("/type_recharges", getType_rechargeQuerySql2);
router.get("/type_recharges", getType_recharges);
router.get("/type_recharge", getType_recharge);
router.post("/type_recharge", createType_recharge);
router.put("/type_recharge", updateType_recharge);
router.delete("/type_recharge", deleteType_recharge);

export default router;
