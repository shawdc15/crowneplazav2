import dbConnect from '../../../utils/dbConnect'
import Voucher from '../../../models/Voucher'

dbConnect()

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const voucher = await Voucher.find()
        res.status(200).json({
          success: true,
          data: voucher,
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'POST':
      try {
        const voucher = await Voucher.create(req.body)
        res.status(201).json({ success: true, data: voucher })
      } catch (error) {
        res.status(400).json({
          success: false,
          errors: {
            descriptionError: error.errors?.description.message,
            statusError: error.errors?.status?.message,
            voucherCodeError:
              error.code === 11000
                ? 'Voucher already exist!'
                : error.errors?.voucher_code?.message,
            discountError: error.errors?.discount.message,
            discountTypeError: error.errors?.discount_type?.message,
          },
        })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
