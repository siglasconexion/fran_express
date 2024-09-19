import express from "express";

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserQuerySql2,
  //login,
} from "../controladores/control_user.js";

const router = express.Router();

//router.get("/users", getUserQuerySql2);
//router.get("/users", authenticateUser, getUsers);
router.get("/users", getUsers);
router.get("/user", getUser);
router.get("/user/:usuario/:password", getUser);
router.post("/user", createUser);
router.put("/user", updateUser);
router.delete("/user", deleteUser);

export default router;
