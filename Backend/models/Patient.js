const { DataTypes } = require('sequelize');
const sequelize = require('../database');

//defining the Patient with given fields
const Patient = sequelize.define('Patient', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE
});

module.exports = Patient;