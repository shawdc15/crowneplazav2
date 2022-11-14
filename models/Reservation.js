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
  purposeOfStay: {
    type: String,
    required: [true, 'Please fill up this field'],
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
  start_expiration: {
    type: Date,
  },
  end_expiration: {
    type: Date,
  },
})

module.exports =
  mongoose.models.Reservation ||
  mongoose.model('Reservation', ReservationSchema)

// const sample = {
//   "checkIn":"2022-02-01",
//   "checkOut":"2022-02-01",
//   "preferredRoom":"201",
//   "noOfGuest":"0",
//   "noOfAdult":"2",
//   "noOfChildren":"3",
//   "noOfExtraBed":"2",
//   "voucherCode":"grab2020",
//   "purposeOfStay":"vacation",
//   "remarks":"Please make it clean",
//   "accomodation_id":"123456789",
//   "status":"pending",
// }
