const uuid = require("uuid/v4");
const validator = require('express-validator');
const mongoose = require('mongoose');

const Key = require('../models/key');
const User = require('../models/user');

const HttpError = require("../models/http-error");


const getKeyById = async (req, res, next) => {
  const keyId = req.params.kid; // stores the id of the key in keyId

  let key;
  try {
      // Search the keys and compare key ids
   key = await Key.findById(keyId);
  } catch(err) {
    const error = new HttpError('Something went wrong, could not find a key.', 500);
    return next(err);

    return next(error);
  }


  if (!key) {
    const error =  new HttpError("Could not find a key for the given id", 404);
    return next(error);
  }

  //respond with the key we found
  res.json({ key: key.toObject({ getters: true }) });
};

const getKeysByUserId = async (req, res, next) => {
  const creatorId = req.params.uid;

  let keys;
  try {
    keys = await Key.find({ userId: creatorId });
  } catch(err) {
    const error = new HttpError('Fetching keys failed, please try again later.', 500);
    return next(error);
  }
   

  if (!keys || keys.length === 0) {
    //next is used for asynchronos actions instead of THROW
    return next(
      new HttpError("Could not find keys for the given user id", 404)
    );
  }

  res.json({ keys: keys.map(key => key.toObject({ getters: true })) });
};
 
const genrateKey = async (req, res, next) => {
    //Check if the express validator catches any erross
    const errors = validator.validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return next(  new HttpError('Invalid input, please check your data.', 422)
      );
    }

  const { title, type, length, publicKeyHash, privateKeyHash, userId } = req.body;
  const generatedKey = new Key({
    title, 
    type: 'RSA',
    length,
    publicKeyHash,
    privateKeyHash,
    userId
  });

  let user;

  try {
    user = await User.findById(userId);
  } catch(err) {
    const error = new HttpError(
      'Generating a new key failed, please try again'
    )
  }

  if (!user) {
    const error = new HttpError(
      'Could not find user for the provided id',
       404);
    return next(error);
  }

  try {
    // using session and transactions to add keys to user and user-id to the keys
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await generatedKey.save({ session: sess });
    //push here is not standard js, but mongoose specific!!
    user.keys.push(generatedKey);
    await user.save({session: sess}); 
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError('Generating key failed, please try again', 500);
    return next (error);
  }





  res.status(201).json({ key: generatedKey });
};

const deleteKey = async (req, res, next) => {
  const keyId = req.params.kid;

  let key;
  try {
    key = await Key.findById(keyId).populate('userId');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete key.',
      500
    );
    return next(error);
  }

  if (!key) {
    const error = new HttpError('Could not find key for this id.', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await key.remove({ session: sess });
    key.userId.keys.pull(key);
    await key.userId.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete key.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted key.' });
};

exports.getKeyById = getKeyById;
exports.getKeysByUserId = getKeysByUserId;
exports.genrateKey = genrateKey;
exports.deleteKey = deleteKey;
