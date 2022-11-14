const mongoose = require('mongoose')

const CalendarSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Please fill up this field'],
  },
  event: {
    type: String,
    required: [true, 'Please fill up this field'],
  },
})

module.exports =
  mongoose.models.Calendar || mongoose.model('Calendar', CalendarSchema)
