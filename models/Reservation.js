const mongoose = require('mongoose')

const ReservationSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'Please fill up this field'],
  },
  name: {
    type: String,
    required: [true, 'Please fill up this field'],
  },
  roomType: {
    type: String,
    required: [true, 'Please fill up this field'],
  },
  checkIn: {
    type: Date,
    required: [true, 'Please fill up this field'],
  },
  checkOut: {
    type: Date,
    required: [true, 'Please fill up this field'],
  },
  email: {
    type: String,
    // required: [true, 'Please fill up this field'],
  },
  preferredRoom: {
    type: String,
    required: [true, 'Please fill up this field'],
  },
  noOfAdult: {
    type: Number,
    required: [true, 'Please fill up this field'],
  },
  noOfChildren: {
    type: Number,
    required: [true, 'Please fill up this field'],
  },
  noOfExtraBed: {
    type: Number,
    required: [true, 'Please fill up this field'],
  },
  voucherCode: {
    type: String,
  },
  remarks: {
    type: String,
  },
  user_id: {
    type: String,
  },
  accomodation_id: {
    type: String,
    required: [true, 'Please fill up this field'],
  },
  status: {
    type: String,
    required: [true, 'Please fill up this field'],
  },
  total: {
    type: Number,
    required: [true, 'Please fill up this field'],
  },
  contact: {
    type: String,
  },
  vaccination: { type: [{ type: String }] },
  end_expiration: {
    type: Date,
  },
  requestComment: {
    type: String,
  },
})

module.exports =
  mongoose.models.Reservation ||
  mongoose.model('Reservation', ReservationSchema)
