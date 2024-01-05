const { User } = require("../db/models/User.js");
const db = require("../db/conn.js");
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
  const data = await User.findAll();
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

const getUserQuerySql2 = async (req, res) => {
  const data = await db.sequelize.query("SELECT  * from user"); //
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

const getUser = async (req, res) => {
  let resultGetOne = await User.findAll({
    where: {
      id_user: req.body.id,
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

const createUser = async (req, res) => {
  const resultNew = await User.create({
    id_company_user: req.body.idcompanyuser,
    id_type_user: req.body.idtypeuser,
    id_status_user: req.body.idstatususer,
    name_user: req.body.nameuser,
    name_key_user: req.body.namekeyuser,
    email_user: req.body.emailuser,
    password_user: req.body.password,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

const updateUser = async (req, res) => {
  try {
    const obj = req.body;
    const id_user = req.body.id_user;
    let resultUpdate = await User.update(obj, {
      where: {
        id_user: id_user,
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

const deleteUser = async (req, res) => {
  try {
    console.log(req.body);
    const id_user = req.body.id;
    let resultDelete = await User.destroy({
      where: {
        id_user,
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

const login = (req, res) => {
  // Aquí deberías realizar la lógica de autenticación del usuario
  // Asumiremos que tienes un sistema de usuarios con contraseñas seguras almacenadas
  const { username, password } = req.body;
  // Verifica las credenciales (esto debe ser reemplazado con tu lógica de autenticación real)
  if (username === 'usuario' && password === 'contraseña') {
    // Genera un token JWT
    const token = jwt.sign({ 
        user: username
    }, secretKey, { expiresIn: '1h' });

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
};

module.exports = {
  getUsers,
  getUserQuerySql2,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login,
};
