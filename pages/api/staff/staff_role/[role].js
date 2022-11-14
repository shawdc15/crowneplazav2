import dbConnect from '../../../../utils/dbConnect'
import Staff from '../../../../models/Staff'

dbConnect()

export default async (req, res) => {
  const {
    query: { role },
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        const staff = await Staff.find({ role: role })
        res.status(200).json({
          success: true,
          data: staff,
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
