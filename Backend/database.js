//import Sequelize class from seq package
const { Sequelize} = require('sequelize');

//Creating a new Seq instance with SQLite(as required) as the dialect and database.sqlite as the storage
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

module.exports = sequelize;