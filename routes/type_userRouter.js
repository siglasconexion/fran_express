import express from "express";

import {
  getType_users,
  getType_user,
  createType_user,
  updateType_user,
  deleteType_user,
  //getType_usersQuerySql2,
} from "./controladores/control_type_user.js";

const router = express.Router();

//router.get("/type_users", gettype_userQuerySql2);
router.get("/type_users", getType_users);
router.get("/type_user", getType_user);
router.post("/type_user", createType_user);
router.put("/type_user", updateType_user);
router.delete("/type_user", deleteType_user);

export default router;
