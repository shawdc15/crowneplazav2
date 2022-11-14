import dbConnect from '../../../utils/dbConnect'
import Voucher from '../../../models/Voucher'

dbConnect()

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        const voucher = await Voucher.findById(id)
        res.status(200).json({
          success: true,
          data: voucher,
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const voucher = await Voucher.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (voucher) {
          return res.status(200).json({ success: true, data: voucher })
        }
        return res.status(400).json({ success: false })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        const voucher = await Voucher.deleteOne({ _id: id })

        if (!voucher) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
