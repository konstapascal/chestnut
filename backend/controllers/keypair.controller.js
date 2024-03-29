const db = require('../models/db.index');
const Keypair = db.keypair;
const User = db.user;
const { Op } = require('sequelize');

// Get all keys of currently logged in user
exports.getMyKeys = (req, res) => {
	// Store id that has been passed from middlewares
	const userID = res.locals.decodedData.id;

	const url = req.protocol + '://' + req.headers.host;

	Keypair.findAll({
		where: {
			UserID: userID
		},
		attributes: ['KeypairID', 'Name', 'Length', 'PublicKey', 'PrivateKey', 'createdAt']
	})
		.then(keypairs => {
			let deleteKeyArray = [];

			keypairs.forEach(keypair => {
				deleteKeyArray.push({
					method: 'DELETE',
					description: `Delete keypair with id ${keypair.KeypairID}`,
					href: url + '/keys/' + keypair.KeypairID
				});
			});

			return res.status(200).json({ status: '200 - OK', keypairs }, [
				{
					self: {
						method: 'GET',
						description: 'Get all keys, public and private of currently logged in user.',
						href: url + '/keys/users/me'
					}
				},
				{
					method: 'POST',
					description: 'Generate a new keypair for currently logged in user.',
					href: url + '/keys/new/users/me'
				},
				{ deleteKeyByID: deleteKeyArray }
			]);
		})
		.catch(err => {
			res.status(500).json({
				status: '500 - Internal Server Error',
				message: 'Error occured while retvieving keys: ' + err
			});
		});
};

// Get all public keys of 1 user by id
exports.getAllPublicKeysByID = (req, res) => {
	const userID = req.params.id;

	const url = req.protocol + '://' + req.headers.host;

	User.findAll({
		where: { ID: userID },
		attributes: ['ID', 'Username'],
		include: [
			{
				model: Keypair,
				attributes: ['KeypairID', 'Name', 'Length', 'PublicKey']
			}
		]
	})
		.then(user => {
			if (user != 0) {
				return res.status(200).json({ status: '200 - OK', user }, [
					{
						self: {
							method: 'GET',
							description: 'Get all public keys of 1 user by id',
							href: url + '/keys/users/' + userID
						}
					}
				]);
			} else {
				return res.status(404).json({
					status: '404 - Not Found',
					message: `User with id of ${userId} was not found or does not have any keys.`
				});
			}
		})
		.catch(err => {
			res.status(500).json({
				status: '500 - Internal Server Error',
				message: 'Error occured while retrieving keys: ' + err
			});
		});
};

// Get all public keypairs for all users, including their username
exports.getAllPublicKeys = (req, res) => {
	const url = req.protocol + '://' + req.headers.host;
	const userId = res.locals.decodedData.id;

	User.findAll({
		where: {
			ID: {
				[Op.ne]: userId
			}
		},
		attributes: ['ID', 'Username'],
		include: [
			{
				model: Keypair,
				attributes: ['KeypairID', 'Name', 'Length', 'PublicKey']
			}
		]
	})
		.then(users => {
			let idArray = [];
			let getKeysByUserIdArray = [];

			// Populate array with all unique user id's
			users.forEach(user => {
				if (idArray.indexOf(user.ID) === -1) {
					idArray.push(user.ID);
				}
			});

			// Push object for each user id
			idArray.forEach(userId => {
				getKeysByUserIdArray.push({
					method: 'GET',
					description: `Get all public keys of user with id ${userId}`,
					href: url + '/keys/users/' + userId
				});
			});

			if (users) {
				return res.status(200).json({ status: '200 - OK', users }, [
					{
						self: {
							method: 'GET',
							description: 'Get all public keys and usernames of all registered users.',
							href: url + '/keys'
						}
					},
					{
						getKeysByUserId: getKeysByUserIdArray
					}
				]);
			} else {
				res.status(404).json({
					status: '404 - Not Found',
					message: 'No keys found.'
				});
			}
		})
		.catch(err => {
			res.status(500).json({
				status: '500 - Internal Server Error',
				message: 'Error occured while retrieving public keys: ' + err
			});
		});
};

// Create new key for currently logged in user
exports.createKey = (req, res) => {
	const userID = res.locals.decodedData.id;
	const name = req.body.name;
	const type = req.body.type;
	const length = req.body.length;
	const publicKey = req.body.publicKey;
	const privateKey = req.body.privateKey;

	const url = req.protocol + '://' + req.headers.host;

	// Validate request
	if (!name || !type || !length || !publicKey || !privateKey) {
		return res.status(400).json({
			status: '400 - Bad Request',
			message:
				'All fields are required and must be filled (name, type, length, publicKey, privateKey).'
		});
	}

	// Create a keypair schema
	const KeypairSchema = {
		Name: name,
		Type: type,
		Length: length,
		PublicKey: publicKey,
		PrivateKey: privateKey,
		UserID: userID
	};

	// Run query to save schema in the database
	Keypair.create(KeypairSchema)
		.then(() => {
			res.status(201).json(
				{
					status: '201 - Created',
					message: `Keypair with the name ${name} was created successfully.`
				},
				[
					{
						self: {
							method: 'POST',
							description: 'Create new keypair for the currently logged in user.',
							href: url + '/keys/new/users/me'
						}
					}
				]
			);
		})
		.catch(err => {
			res.status(500).json({
				status: '500 - Internal Server Error',
				message: 'Error occurred while creating keypair: ' + err
			});
		});
};

// Delete key by id, checking if key belongs to the user making the request
exports.deleteKey = async (req, res) => {
	const keyID = req.params.id;
	const userID = res.locals.decodedData.id;

	const url = req.protocol + '://' + req.headers.host;

	// Check for keypair entry with key ID and user ID, proving ownership of key
	const getUserID = await Keypair.findOne({
		where: { UserID: userID, KeypairID: keyID }
	});

	// User does not own the keypair and therefore is not allowed to delete it
	if (!getUserID) {
		return res.status(403).json({
			status: '403 - Forbidden',
			message: 'You do not have the permissions to delete this keypair.'
		});
	}

	// Delete key
	Keypair.destroy({
		where: { KeypairID: keyID }
	})
		.then(keypair => {
			if (keypair) {
				res.status(200).json(
					{
						status: '200 - OK',
						message: 'Keypair was deleted successfully.'
					},
					[
						{
							self: {
								method: 'POST',
								description: 'Create new keypair for the currently logged in user.',
								href: url + '/keys/new/users/me'
							}
						}
					]
				);
			} else {
				res.status(404).json({
					status: '404 - Not Found',
					message: `Keypair with id ${keyID} was not found.`
				});
			}
		})
		.catch(err => {
			res.status(500).json({
				status: '500 - Internal Server Error',
				message: `Could not delete keypair with id ${keyID}: ` + err
			});
		});
};
