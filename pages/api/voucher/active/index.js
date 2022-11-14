import dbConnect from '../../../../utils/dbConnect'
import Voucher from '../../../../models/Voucher'

dbConnect()

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const voucher = await Voucher.find({ status: 'Active' })
        res.status(200).json({
          success: true,
          data: voucher,
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
