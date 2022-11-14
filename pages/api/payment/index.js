import dbConnect from '../../../utils/dbConnect'
import Reservation from '../../../models/Reservation'

dbConnect()

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const payment = await Reservation.find()
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
