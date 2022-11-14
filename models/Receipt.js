const mongoose = require('mongoose')

const ReceiptSchema = new mongoose.Schema({
  receiptFor: {
    type: String,
    required: [true, 'Please fill up this field'],
  },
  reason: {
    type: String,
  },
  // paymentMethod: {
  //   type: String,
  //   required: [true, 'Please fill up this field'],
  // },
  creditCardNumber: {
    type: String,
  },
  preferredRoom: {
    type: String,
  },
  roomType: {
    type: String,
  },
  reservation_id: {
    type: String,
    required: [true, 'Please fill up this field'],
  },
  channel: {
    type: String,
    required: [true, 'Please fill up this field'],
  },
  total: {
    type: Number,
    required: [true, 'Please fill up this field'],
  },
  status: {
    type: String,
    required: [true, 'Please fill up this field'],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

module.exports =
  mongoose.models.Receipt || mongoose.model('Receipt', ReceiptSchema)
