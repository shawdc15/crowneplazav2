import dbConnect from '../../utils/dbConnect'
import Receipt from '../../models/Receipt'

dbConnect()

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const receipt = await Receipt.find({ status: 'pending' })
        res.status(200).json({
          success: true,
          data: receipt,
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
