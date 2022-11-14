import dbConnect from '../../../utils/dbConnect'
import Reservation from '../../../models/Reservation'

dbConnect()

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        const reservation = await Reservation.findById(id)
        res.status(200).json({
          success: true,
          data: reservation,
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const reservation = await Reservation.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (reservation) {
          return res.status(200).json({ success: true, message: reservation })
        }
        return res.status(400).json({ success: false })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        const reservation = await Reservation.deleteOne({ _id: id })

        if (!reservation) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
