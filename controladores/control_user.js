import { User } from '../db/models/User.js';
import { db } from '../db/conn.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
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

export const getUserQuerySql2 = async (req, res) => {
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

export const getUser = async (req, res) => {
  const { usuario, password } = req.params;

  let resultGetOne = await User.findOne({
    where: {
      name_key_user: usuario,
      password_user: password,
    },
  });
  console.log("resultGetOne", resultGetOne);
  console.log("usuario", usuario, "password", password);
  if (!resultGetOne || resultGetOne.length === 0) {
    res.json({
      message: "Results not found",
      code: 201,
      statusText: "nuevo mensaje",
      ok: "false",
    });
    return;
  }
  res.json(resultGetOne);
};

export const createUser = async (req, res) => {
  const resultNew = await User.create({
    id_company_user: req.body.idcompanyuser,
    id_type_user: req.body.idtypeuser,
    id_status_user: req.body.idstatususer,
    name_user: req.body.nameuser,
    name_key_user: req.body.namekeyuser,
    email_user: req.body.emailuser,
    password_user: req.body.passworduser,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

export const updateUser = async (req, res) => {
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

export const deleteUser = async (req, res) => {
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

export const login = async (req, res) => {
  const secretKey = 'tu_clave_secreta'; // Obtén la clave secreta desde las variables de entorno
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email_user: email,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password_user);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const token = jwt.sign(
      {
        user: {
          id: user.id,
          email: user.email_user,
        },
      },
      secretKey,
      { expiresIn: "1h" }
    );
    return res.json({ token, name_user: user.name_user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};


export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await User.findOne({
      where: { email_user: email },
    });

    if (user) {
      await user.update({
        password_user: hashedPassword,
      });
      return res.status(200).json({
        message: 'Usuario actualizado con éxito',
        user,
      });
    }
    user = await User.create({
      email_user: email,
      password_user: hashedPassword,
    });

    return res.status(201).json({
      message: 'Usuario creado con éxito',
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const findUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id_user: id,
      },
    });
    console.log("User found:", user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        code: 404,
        ok: false,
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      message: "Internal server error",
      code: 500,
      ok: false,
    });
  }
};

export const createOrUpdateUser = async (req, res) => {
  const {
    idcompanyuser,
    idtypeuser,
    idstatususer,
    nameuser,
    namekeyuser,
    emailuser,
    passworduser,
  } = req.body;

  try {
    // Cifrar la contraseña antes de usarla
    const hashedPassword = await bcrypt.hash(passworduser, 10);

    // Buscar si ya existe un usuario con ese email
    let user = await User.findOne({
      where: { email_user: emailuser },
    });

    if (user) {
      await user.update({
        id_company_user: idcompanyuser,
        id_type_user: idtypeuser,
        id_status_user: idstatususer,
        name_user: nameuser,
        name_key_user: namekeyuser,
        password_user: hashedPassword,
      });

      return res.status(200).json({
        message: "Usuario actualizado con éxito",
        user,
      });
    }

    user = await User.create({
      id_company_user: idcompanyuser,
      id_type_user: idtypeuser,
      id_status_user: idstatususer,
      name_user: nameuser,
      name_key_user: namekeyuser,
      email_user: emailuser,
      password_user: hashedPassword,
    });

    return res.status(201).json({
      message: "Usuario creado con éxito",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
