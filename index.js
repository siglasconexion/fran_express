import express from "express";
//import { suma } from "./controladores/control_family.js";
import { Sequelize, DataTypes, Op } from "sequelize";
import {
  getFamilys,
  getFamily,
  createFamily,
  updateFamily,
  deleteFamily,
  getUserQuerySql,
  getDataExcel,
} from "./controladores/control_family.js";

import {
  getStatus,
  getStatu,
  createStatu,
  updateStatu,
  deleteStatu,
} from "./controladores/control_statu.js";

import {
  getCompanys,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} from "./controladores/control_company.js";

import {
  getContainers,
  getContainer,
  createContainer,
  updateContainer,
  deleteContainer,
} from "./controladores/control_container.js";

import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from "./controladores/control_item.js";

import {
  getStock_details, // esta asi porque uso otra funcion
  getStock_detail,
  createStock_detail,
  updateStock_detail,
  deleteStock_detail,
  getStock_detailQuerySql2,
} from "./controladores/control_stock_detail.js";

import {
  getCurrent_inventorys,
  getCurrent_inventory,
  createCurrent_inventory,
  updateCurrent_inventory,
  deleteCurrent_inventory,
  getCurrent_inventoryQuerySql2,
} from "./controladores/control_current_inventory.js";

import {
  getStocks,
  getStock,
  createStock,
  updateStock,
  deleteStock,
  getStockQuerySql2,
} from "./controladores/control_stock.js";

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserQuerySql2,
  login,
} from "./controladores/control_user.js";

import db from "./db/conn.js";
import bodyParser from "body-parser";
import cors from "cors";
import { authenticateUser }  from "./middleware/auth.js";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Model family
app.get("/familys", getFamilys);
app.get("/family", getFamily);
app.post("/family", createFamily);
app.put("/family", updateFamily);
app.delete("/family", deleteFamily);
//app.get("/getDataExcel", getDataExcel);
//app.get("/getUserQuerySql", getUserQuerySql);
// end Model family

// Model status
app.get("/status", getStatus);
app.get("/statu", getStatu);
app.post("/statu", createStatu);
app.put("/statu", updateStatu);
app.delete("/statu", deleteStatu);
// end model status

// Model company
app.get("/companys", getCompanys);
app.get("/company", getCompany);
app.post("/company", createCompany);
app.put("/company", updateCompany);
app.delete("/company", deleteCompany);
// end model company

// Model container
app.get("/containers", getContainers);
app.get("/container", getContainer);
app.post("/container", createContainer);
app.put("/container", updateContainer);
app.delete("/container", deleteContainer);
// end model container

// Model Item
app.get("/items", getItems);
app.get("/item", getItem);
app.post("/item", createItem);
app.put("/item", updateItem);
app.delete("/item", deleteItem);
// end model item

// Model Stock_detail
app.get("/stock_details", getStock_detailQuerySql2);
//app.get("/stock_details", getStock_details);
app.get("/stock_detail", getStock_detail);
app.post("/stock_detail", createStock_detail);
app.put("/stock_detail", updateStock_detail);
app.delete("/stock_detail", deleteStock_detail);
// end model Stock_detail

// Model Current_inventory
//app.get("/current_inventorys", getCurrent_inventoryQuerySql2);
app.get("/current_inventorys", getCurrent_inventorys);
app.get("/current_inventory", getCurrent_inventory);
app.post("/current_inventory", createCurrent_inventory);
app.put("/current_inventory", updateCurrent_inventory);
app.delete("/current_inventory", deleteCurrent_inventory);
// end model Current_inventory

// Model stock
//app.get("/stoks", getStockQuerySql2);
app.get("/stocks", getStocks);
app.get("/stock", getStock);
app.post("/stock", createStock);
app.put("/stock", updateStock);
app.delete("/stock", deleteStock);
// end model stock

// Model user
//app.get("/users", getUserQuerySql2);
app.get("/users", authenticateUser, getUsers);
app.get("/user", getUser);
app.post("/user", createUser);
app.put("/user", updateUser);
app.delete("/user", deleteUser);
app.post("/login", login);
// end model user

app.listen(port, async () => {
  await db.sequelize;
  console.log(`Example app listening on port ${port}`);
});
