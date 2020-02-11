const uuid = require("uuid/v4");
const validator = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");



const mongoose = require('mongoose');



const getUsers = async (req, res, next) => {
  let users;
  try{
    users = await User.find({}, 'email userName');
  } catch(err) {
    const error = new HttpError(
      'Fetching users failed, please try again later',
      500
    );
    return next(error);
  }

  res.json({ users:  users.map(user => user.toObject({ getters:true })) });
   
};

const signup = async (req, res, next) => {
  const errors = validator.validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { userName, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  
  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }
  const createdUser = new User({
    userName,
    email,
    password,
    keys: []
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login =  async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Login in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      'Invalid email or password', 401
    );
    return next(error);
  }

  res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
