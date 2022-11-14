import dbConnect from '../../../../utils/dbConnect'
import Reservation from '../../../../models/Reservation'
import moment from 'moment'
dbConnect()

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const reservation = await Reservation.find({
          $or: [
            { checkIn: { $gte: req.body.checkIn, $lte: req.body.checkOut } },
            {
              checkOut: {
                $gte: req.body.checkIn,
                $lte: req.body.checkOut,
              },
            },
          ],
          status: { $in: ['checkedIn', 'reserved', 'requested'] },
          accomodation_id: req.body.accomodation_id,
        }).distinct('preferredRoom')
        res.status(200).json({
          success: true,
          data: reservation,
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
  }
}
