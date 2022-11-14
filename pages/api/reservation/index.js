import dbConnect from '../../../utils/dbConnect'
import Reservation from '../../../models/Reservation'

dbConnect()

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const reservation = await Reservation.find({
          status: { $in: ['approved', 'checkedIn', 'checkedOut', 'reserved'] },
        })
        res.status(200).json({
          success: true,
          data: reservation,
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'POST':
      try {
        const reservation = await Reservation.create(req.body)
        res.status(201).json({ success: true, data: reservation })
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
