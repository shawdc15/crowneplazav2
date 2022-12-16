import dbConnect from '../../../utils/dbConnect'
import Staff from '../../../models/Staff'
import bcrypt from 'bcrypt'

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
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const staff = await Staff.create({
          ...req.body,
          password: hashPassword,
        })
        res.status(201).json({ success: true, data: staff })
      } catch (error) {
        console.log(error)
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
