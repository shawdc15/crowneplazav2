import dbConnect from '../../../../utils/dbConnect'
import Reservation from '../../../../models/Reservation'

dbConnect()

export default async (req, res) => {
  const {
    query: { status },
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        const reservation = await Reservation.find({ status: status })
        res.status(200).json({
          success: true,
          data: reservation,
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
