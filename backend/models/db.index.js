// const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'konsta', 'mysqlpass', {
	host: '127.0.0.1',
	dialect: 'mysql',
	port: 3306,
	logging: false,
	define: {
		timestamps: false
	}
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
