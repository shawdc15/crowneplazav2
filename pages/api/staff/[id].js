import dbConnect from '../../../utils/dbConnect'
import Staff from '../../../models/Staff'

dbConnect()

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        const staff = await Staff.findById(id)
        res.status(200).json({
          success: true,
          data: staff,
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const staff = await Staff.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (staff) {
          return res.status(200).json({ success: true, data: staff })
        }
        return res.status(400).json({ success: false })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        const staff = await Staff.deleteOne({ _id: id })

        if (!staff) {
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
