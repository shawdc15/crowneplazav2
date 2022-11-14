import dbConnect from '../../../utils/dbConnect'
import Calendar from '../../../models/Calendar'

dbConnect()

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req
  //
  switch (method) {
    case 'GET':
      try {
        const calendar = await Calendar.findById(id)
        res.status(200).json({
          success: true,
          data: calendar,
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const calendar = await Calendar.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (calendar) {
          return res.status(200).json({ success: true, message: calendar })
        }
        return res.status(400).json({ success: false })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        const calendar = await Calendar.findByIdAndDelete(id)
        if (calendar) {
          return res.status(200).json({ success: true, message: calendar })
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
