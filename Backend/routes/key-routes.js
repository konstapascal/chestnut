const express = require('express');

const router = express.Router();

const keyKontrollers = require('../controllers/keys-controllers');

router.get('/:kid',  keyKontrollers.getKeyById);

router.get('/user/:uid', keyKontrollers.getKeyByUserId);

router.post('/', keyKontrollers.genrateKey);

module.exports = router;

