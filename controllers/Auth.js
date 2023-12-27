import Users from "../models/UserModel.js";
import Profile from "../models/ProfileModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

export const getMe = async (req, res) => {
  try {
    const {userId} = req

    const user = await Users.findOne({
      attributes: ["id", "name", "jenis_pengguna", "no_telp", "email", "current_profile"],
      where: {
        id: userId,
      },
    });

    const profile = await Profile.findOne({where: {id: user.current_profile}})
    const response = { ...user.dataValues, content_rating: profile.contentRating };
    res.status(200).json({
      status: "success",
      msg: "Berhasil Mendapatkan User",
      result: { user: response },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const register = async (req, res) => {
  const { email, password, conf_password } = req.body;
  if (password !== conf_password)
    return res
      .status(400)
      .json({ msg: "password dan confirmation password tidak cocok" });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(400).json({
      status: "error",
      msg: errors["errors"][0].path + " " + errors["errors"][0].msg,
      result: errors["errors"],
    });
  }
  
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      email: email,
      password: hashPassword,
    });
    res.status(200).json({
      status: "success",
      msg: "Register Berhasil",
      result: {
        email: email,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    console.log(req.body.email);
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });

    const userId = user.id;
    const name = user.name
    const jenis_pengguna = user.jenis_pengguna;
    const email = user.email;
    const no_telp = user.no_telp
    const currentProfile= user.current_profile
       

    const accessToken = jwt.sign(
      { userId,name, jenis_pengguna, email, no_telp, currentProfile },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      { userId,name, jenis_pengguna, email, no_telp, currentProfile },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 1000,
    });
    res.json({ token: accessToken, result: {id: userId, jenis_pengguna, email, no_telp, current_profile: currentProfile}});
  } catch (error) {
    res.status(404).json({ msg: "User Tidak Ditemukan" });
  }
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
