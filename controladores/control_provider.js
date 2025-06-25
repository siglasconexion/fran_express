import { Provider } from "../db/models/provider.js";
import { QueryTypes } from "sequelize";
import { db } from "../db/conn.js";
import _ from "lodash";

export const getProviders = async (req, res) => {
  const data = await Provider.findAll();
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

export const getProvider = async (req, res) => {
  let resultGetOne = await Provider.findAll({
    where: {
      id_provider: req.body.id,
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

export const createProvider = async (req, res) => {
  const resultNew = await Provider.create({
    id_company_provider: req.body.idcompanyprovider,
    id_status_provider: req.body.idstatusprovider,
    provider_code: req.body.providercode,
    provider_name: req.body.providername,
    provider_address: req.body.provideraddress,
    provider_zip_code: req.body.providerpostalcode,
    provider_city: req.body.providercity,
    provider_unit: req.body.providerunit,
    provider_email: req.body.provideremail,
    provider_phone_number: req.body.providerphonenumber,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

export const updateProvider = async (req, res) => {
  try {
    const obj = req.body;
    const id_provider = req.body.id_provider;
    let resultUpdate = await Provider.update(obj, {
      where: {
        id_provider: id_provider,
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

export const deleteProvider = async (req, res) => {
  try {
    const id_provider = req.body.id;
    let resultDelete = await Provider.destroy({
      where: {
        id_provider,
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
