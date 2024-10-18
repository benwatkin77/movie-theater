// import our db, Model, DataTypes
const { db, DataTypes } = require('../db/connection')

// Creating a User child class from the Model parent class
const User = db.define('User', {
  username: DataTypes.STRING,
  password: DataTypes.STRING
})

// exports
module.exports = User