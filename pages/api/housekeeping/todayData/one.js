import dbConnect from '../../../../utils/dbConnect'
import Housekeeping from '../../../../models/Housekeeping'
import Accomodation from '../../../../models/Accomodation'

dbConnect()

export default async (req, res) => {
  const {
    query: { date },
    method,
  } = req

  switch (method) {
    case 'POST':
      try {
        const { roomNo, roomName, date } = req.body
        const accommodation = await Accomodation.find({
          roomNo,
          roomName,
          date,
        })

        // console.log(req.body)
        if (!accommodation.length) {
          return res.status(400).json({ success: false })
        } else {
          const housekeeping = await Housekeeping.find(req.body)
          res.status(200).json({
            success: true,
            data: housekeeping,
          })
        }
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
