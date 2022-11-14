const mongoose = require('mongoose')

const AccomodationSchema = new mongoose.Schema({
  roomName: {
    type: String,
    unique: true,
    required: [true, 'Please fill up this field'],
  },
  description: {
    type: String,
    required: [true, 'Please fill up this field'],
  },
  price: {
    type: Number,
    required: [true, 'Please fill up this field'],
  },
  roomNo: {
    type: [{ type: String }],
    required: [true, 'Please fill up this field'],
  },
  roomStatus: {
    type: String,
    required: [true, 'Please fill up this field'],
  },
  note: {
    type: String,
    required: [true, 'Please fill up this field'],
  },
  maxAdult: {
    type: Number,
    required: [true, 'Please fill up this field'],
  },
  maxChildren: {
    type: Number,
    required: [true, 'Please fill up this field'],
  },
  image: {
    type: String,
  },
})

module.exports =
  mongoose.models.Accomodation ||
  mongoose.model('Accomodation', AccomodationSchema)
