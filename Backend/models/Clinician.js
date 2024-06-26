const {DataTypes} = require('sequelize');
const sequelize = require('../database');

//defining the CLinician model with the given fields
const Clinician = sequelize.define('Clinician', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    state: DataTypes.STRING,
    npiNumber: DataTypes.STRING
});

module.exports = Clinician;