import dbConnect from '../../../utils/dbConnect'
import Staff from '../../../models/Staff'

dbConnect()

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const staff = await Staff.find()
        res.status(200).json({
          success: true,
          data: staff,
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'POST':
      try {
        const staff = await Staff.create(req.body)
        res.status(201).json({ success: true, data: staff })
      } catch (error) {
        res.status(400).json({
          success: false,
          errors: {
            emailError: error.code === 11000 && 'Email already exist!',
          },
        })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
