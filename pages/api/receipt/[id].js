import dbConnect from '../../../utils/dbConnect'
import Receipt from '../../../models/Receipt'

dbConnect()

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        const receipt = await Receipt.find({ reservation_id: id })
        res.status(200).json({
          success: true,
          data: receipt,
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const receipt = await Receipt.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (receipt) {
          return res.status(200).json({ success: true, message: receipt })
        }
        return res.status(400).json({ success: false })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
