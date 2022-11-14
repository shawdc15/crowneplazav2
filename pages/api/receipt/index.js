import dbConnect from '../../../utils/dbConnect'
import Receipt from '../../../models/Receipt'

dbConnect()

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const receipt = await Receipt.find()
        res.status(200).json({
          success: true,
          data: receipt,
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'POST':
      try {
        const receipt = await Receipt.create(req.body)
        res.status(201).json({ success: true, data: receipt })
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
