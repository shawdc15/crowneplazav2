import dbConnect from '../../../utils/dbConnect'
import { verify } from 'jsonwebtoken'
import User from '../../../models/User'

dbConnect()

export default async (req, res) => {
  const secret = process.env.SECRET
  try {
    const { cookies } = req
    const jwt = cookies.OursiteJWT
    if (!jwt) {
      return res.json({ success: false, message: 'no token' })
    }
    const user = verify(jwt, secret)
    const user_data = await User.findById(user.id).select([
      '-password',
      '-role',
      '-__v',
    ])
    res.json({ success: true, data: user_data })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}
