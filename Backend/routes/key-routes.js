const express = require("express");
const validator = require("express-validator");

const router = express.Router();

const keyControllers = require("../controllers/keys-controllers");

router.get("/:kid", keyControllers.getKeyById);

router.get("/user/:uid", keyControllers.getKeysByUserId);

router.post(
  "/",
  [
    validator
      .check("title")
      .not()
      .isEmpty()
  ],
  keyControllers.genrateKey
);

router.delete("/:kid", keyControllers.deleteKey);

module.exports = router;
