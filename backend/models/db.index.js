// const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');

const sequelize = new Sequelize('chestnut', 'root', 'mysqlpass', {
	host: '127.0.0.1',
	dialect: 'mysql',
	port: 3306,
	logging: false,
	define: {
		timestamps: false
	}
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model.js')(sequelize, Sequelize);
db.keypair = require('./keypair.model.js')(sequelize, Sequelize);

// 1 user has many keypairs, 1 keypair belongs to 1 user
db.user.hasMany(db.keypair);
db.keypair.belongsTo(db.user);

module.exports = db;
