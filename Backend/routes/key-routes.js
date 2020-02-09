const express = require('express');

const router = express.Router();

const keyControllers = require('../controllers/keys-controllers');

router.get('/:kid',  keyControllers.getKeyById);

router.get('/user/:uid', keyControllers.getKeysByUserId);

router.post('/', keyControllers.genrateKey);

router.delete('/:kid', keyControllers.deleteKey);

module.exports = router;

