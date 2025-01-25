import express from "express";

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserQuerySql2,
  login,
  register,
  findUserById,
  createOrUpdateUser
} from "../controladores/control_user.js";

const router = express.Router();

//router.get("/users", getUserQuerySql2);
//router.get("/users", authenticateUser, getUsers);
router.get("/users", getUsers);
router.post("/login", login);
router.post("/register", register);
router.post("/createOrUpdateUser", createOrUpdateUser);

router.get("/user", getUser);
router.get("/user/:usuario/:password", getUser);
router.post("/", createUser);
router.put("/user", updateUser);
router.delete("/user", deleteUser);
router.get("/:id", findUserById);

export default router;
