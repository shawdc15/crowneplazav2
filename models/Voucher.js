const mongoose = require('mongoose')

const VoucherSchema = new mongoose.Schema({
  voucher_code: {
    type: String,
    unique: true,
    required: [true, 'Voucher Code must not be empty'],
  },
  description: {
    type: String,
    required: [true, 'Description must not be empty'],
  },
  discount: {
    type: String,
    required: [true, 'Discount must not be empty'],
  },
  discount_type: {
    type: String,
    required: [true, 'Discount Type must not be empty'],
  },
  status: {
    type: String,
    required: [true, 'Status must not be empty'],
  },
})

module.exports =
  mongoose.models.Voucher || mongoose.model('Voucher', VoucherSchema)
