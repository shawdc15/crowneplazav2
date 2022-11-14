const mongoose = require('mongoose')

const LogReportSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  preferredRoom: {
    type: String,
  },
  roomType: {
    type: String,
  },
  roomStatus: {
    type: String,
  },
  reservationStatus: {
    type: String,
  },
  cleaner: {
    type: String,
  },
  verifiedBy: {
    type: String,
  },
})

module.exports =
  mongoose.models.LogReport || mongoose.model('LogReport', LogReportSchema)
