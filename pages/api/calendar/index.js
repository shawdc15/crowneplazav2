import dbConnect from '../../../utils/dbConnect'
import Calendar from '../../../models/Calendar'

dbConnect()

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const calendar = await Calendar.find()
        res.status(200).json({
          success: true,
          data: calendar,
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        // const { date,events} = req.body

        const add_events = await Calendar.create(req.body)
        res.status(201).json({ success: true, data: add_events })
      } catch (error) {
        res.status(400).json({
          success: false,
          errors: error,
        })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
