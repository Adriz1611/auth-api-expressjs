const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../Models/User.model");
const {authSchema} = require("../Helpers/validation_schema")
const { signAccessToken } = require('../Helpers/jwt_helper')

router.post("/register", async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body)
    console.log(result)

    const doesExist = await User.findOne({ email: result.email });
    if (doesExist)
      throw createError.Conflict(`${result.email} has already been registered`);

    const user = new User(result)
    const savedUser = await user.save();

    const accessToken = await signAccessToken(savedUser.id) 
    res.send(accessToken)
  } catch (error) {
    if (error.isJoi === true) error.status = 422
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  res.send("Login route");
});

router.post("/refresh-token", async (req, res, next) => {
  res.send("Refresh token route");
});

router.delete("/logout", async (req, res, next) => {
  res.send("Logout route");
});

module.exports = router;
