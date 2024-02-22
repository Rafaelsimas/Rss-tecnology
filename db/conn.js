const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('codetime', 'root', '', {
	host: 'localhost',
	dialect: 'mysql'
})



module.exports = sequelize