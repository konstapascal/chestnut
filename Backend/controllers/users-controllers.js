const uuid = require("uuid/v4");
const validator = require('express-validator');

const HttpError = require("../models/http-error");

let example_users = [
  {
    id: "1",
    userName: "abz",
    email: "abz@test.com",
    password: "MyPass"
  }
];

const getUsers = (req, res, nex) => {
  res.json({ users: example_users });
};

const signup = (req, res, nex) => {
  const errors = validator.validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
      throw new HttpError('Invalid input, please check your data.', 422);
  }


  const { userName, email, password } = req.body;

  const hasUser = example_users.find(u => u.email === email);

  if (hasUser) {
    throw new HttpError("Could not create user, email already exists", 422);
  }

  const createdUser = {
    id: uuid(),
    userName,
    email,
    password
  };

  example_users.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, nex) => {
  const { email, password } = req.body;

  //Search to see if we find a user with the given email
  const identifiedUser = example_users.find(u => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identirfy user, wrong email or password.",
      401
    );
  }

  res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
