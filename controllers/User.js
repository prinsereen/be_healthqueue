import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "jenis_pengguna", "no_telp", "email"],
    });
    res.status(200).json({
      status: "success",
      msg: "Berhasil Mendapatkan All User",
      result: {
        users,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await Users.findOne({
      attributes: ["id", "name", "jenis_pengguna", "no_telp"],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      status: "success",
      msg: "Berhasil Mendapatkan User",
      result: { user },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user)
      return res
        .status(404)
        .json({ status: "error", msg: "User tidak ditemukan", result: {} });
    const { name, jenis_pengguna, no_telp, password, confPassword } =
      req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        msg: errors["errors"][0].param + " " + errors["errors"][0].msg,
        result: errors["errors"],
      });
    }
    
    let hashPassword;
    if (password === "" || password == null) {
      hashPassword = user.password;
    } else {
      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(password, salt);
    }
    if (password !== confPassword)
      return res.status(400).json({
        status: "error",
        msg: "Password and Confirmation Password not match",
        result: {},
      });
    try {
      await Users.update(
        {
          name: name,
          jenis_pengguna: jenis_pengguna,
          password: hashPassword,
          no_telp: no_telp,
        },
        {
          where: {
            id: user.id,
          },
        }
      );
      res.status(200).json({
        status: "success",
        msg: "User Updated",
        result: {
          name: name,
          jenis_pengguna: jenis_pengguna,
          no_telp: no_telp,
        },
      });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user)
    return res
      .status(404)
      .json({ status: "error", msg: "User tidak ditemukan", result: {} });
  try {
    await Users.destroy({
      where: {
        id: user.id,
      },
    });
    res
      .status(201)
      .json({ status: "success", msg: "User Deleted", result: {} });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
