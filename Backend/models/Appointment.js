//Import DataTypes from sequelize package to define model attributes
const { DataTypes } = require('sequelize');

//Import seq instance fromt he DB config.
const sequelize = require('../database');

//Import the files models to establish relationships
const Clinician = require('./Clinician');
const Patient = require('./Patient');

//Defining the fields
const Appointment = sequelize.define('Appointment', {
    appointmentTime: DataTypes.TIME,
    status: DataTypes.STRING
});

//making relationship: As asppointment belongs to a clinician and patient
Appointment.belongsTo(Clinician);
Appointment.belongsTo(Patient);

module.exports = Appointment;