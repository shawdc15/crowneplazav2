const mongoose = require('mongoose')

const StaffSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  contact: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    default: 'crowneplaza2022',
  },
  role: {
    type: String,
  },
  sector: {
    type: String,
  },
  shift: {
    type: String,
  },
  position: {
    type: String,
  },
  statusofemployment: {
    type: String,
    default: 'working',
  },
})

module.exports = mongoose.models.Staff || mongoose.model('Staff', StaffSchema)
