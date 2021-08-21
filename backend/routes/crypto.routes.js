module.exports = app => {
	const Crypto = require('../controllers/crypto.controller');
	const jwtMiddleware = require('../middlewares/check.token');
	const router = require('express').Router();

	// Encrypt text
	router.post('/encrypt', jwtMiddleware.checkToken, Crypto.encryptText);

	// Decrypt text
	router.post('/decrypt', jwtMiddleware.checkToken, Crypto.decryptText);

	app.use(router);
};
