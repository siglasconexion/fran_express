import { Type_move_inventory } from "../db/models/type_move_inventory.js";
import { db } from "../db/conn.js";

export const getType_move_inventorys = async (req, res) => {
  const data = await Type_move_inventory.findAll();
  if (data.length <= 0) {
    res.status(201).json({
      code: 201,
      message: "Results not foundssdsdasdasd",
      statusText: "nuevo mensaje",
      ok: "false",
    });
    return;
  }
  res.status(200).json(data);
};

export const getType_move_inventoryQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query("SELECT  * from type_move_inventory"); //
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

export const getType_move_inventory = async (req, res) => {
  let resultGetOne = await Type_move_inventory.findAll({
    where: {
      id_type_move_inventory: req.body.id,
    },
  });
  if (resultGetOne.length <= 0) {
    res.json({
      message: "Results not found",
    });
    return;
  }
  res.json(resultGetOne);
};

export const createType_move_inventory = async (req, res) => {
  const resultNew = await Type_move_inventory.create({
    name_move_inventory: req.body.name,
    id_type_inventory: req.body.idtypeinventory,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

export const updateType_move_inventory = async (req, res) => {
  try {
    const obj = req.body;
    const id = req.body.id;
    let resultUpdate = await Type_move_inventory.update(obj, {
      where: {
        id_type_move_inventory: id,
      },
    });
    if (resultUpdate[0] === 1) {
      res.status(200).json({
        message: "Status Update successfully",
        resultUpdate: resultUpdate,
      });
    } else {
      throw { status: res.status, statusText: res.statusText };
      res.status(400).json({
        error: "valor demasiado grande",
        message: "Status not successfully",
        resultUpdate: resultUpdate,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: "valor demasiado grande",
      message: "Status not successfully",
    });
    console.log(err.stack);
    console.log("aca solo el error", err);
  }
};

export const deleteType_move_inventory = async (req, res) => {
  try {
    const id_type_move_inventory = req.body.id;
    let resultDelete = await Type_move_inventory.destroy({
      where: {
        id_type_move_inventory,
      },
    });
    resultDelete === 1
      ? res.json({
          message: "Status was deleted successfully",
          resultDelete: resultDelete,
        })
      : res.json({
          message: "Status Not deleted successfully",
          resultdelete: resultDelete,
        });
  } catch (err) {
    console.log(err.stack);
  }
};
