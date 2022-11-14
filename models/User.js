const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name must not be empty'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name must not be empty'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Username must not be empty'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email must not be empty'],
  },
  contact: {
    type: String,
    required: [true, 'Contact must not be empty!'],
  },
  password: {
    type: String,
    required: [true, 'Password must not be empty!'],
  },
  age: {
    type: String,
    required: [true, 'Age must not be empty!'],
  },
  role: {
    type: String,
    default: 'customer',
  },
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
