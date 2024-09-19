import express from "express";

import {
  getStock_details_pakage,
  getStock_detail_pakage,
  createStock_detail_pakage,
  updateStock_detail_pakage,
  deleteStock_detail_pakage,
  getStock_detail_pakageQuerySql2,
} from "../controladores/control_stock_detail_pakage.js";

const router = express.Router();

router.get("/stock_details_pakage/:variable", getStock_detail_pakageQuerySql2);
//router.get("/stock_details_pakage", getStock_details_pakage);
router.get("/stock_detail_pakage/:variable", getStock_detail_pakage);
router.post("/stock_detail_pakage", createStock_detail_pakage);
router.put("/stock_detail_pakage", updateStock_detail_pakage);
router.delete("/stock_detail_pakage", deleteStock_detail_pakage);

export default router;
