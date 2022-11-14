import dbConnect from '../../../../utils/dbConnect'
import Calendar from '../../../../models/Calendar'

dbConnect()

export default async (req, res) => {
  const {
    query: { date },
    method,
  } = req
  //
  switch (method) {
    case 'GET':
      try {
        const calendar = await Calendar.find({ date })
        res.status(200).json({
          success: true,
          data: calendar,
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
