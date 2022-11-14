import dbConnect from '../../../../utils/dbConnect'
import LogReport from '../../../../models/LogReport'

dbConnect()

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const logreport = await LogReport.find().sort({ date: -1 })
        res.status(200).json({
          success: true,
          data: logreport,
        })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, error })
      }
      break
    case 'POST':
      try {
        const logReport = await LogReport.create(req.body)
        res.status(201).json({ success: true, data: logReport })
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
