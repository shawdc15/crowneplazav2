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
        const payment = await Reservation.findById(id)
        res.status(200).json({
          success: true,
          data: payment,
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
