const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Contract = db.define('Contract', {
    name: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    contractstart: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    descriptionservice: {
        type: DataTypes.STRING,
        allowNull: false 
    }
})

module.exports = Contract