import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'
import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'

dbConnect()

const secret = process.env.SECRET

export default async (req, res) => {
  const { username, password } = req.body
  let newError = {}
  if (username?.trim() == '' || username == undefined) {
    newError = { ...newError, usernameError: 'Please enter username!' }
  }
  if (password?.trim() == '' || password == undefined) {
    newError = { ...newError, passwordError: 'Please enter password!' }
  }
  if (
    newError.hasOwnProperty('usernameError') ||
    newError.hasOwnProperty('passwordError')
  ) {
    res.json({
      success: false,
      errors: newError,
    })
  } else {
    let result = null
    try {
      const user = await User.findOne({ username, password }).select([
        '-password',
        '-role',
        '-__v',
      ])
      result = user
    } catch (error) {
      console.log(error)
    }

    if (result) {
      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          id: result._id,
          role: result._role,
        },
        secret
      )
      const serialized = serialize('OursiteJWT', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })
      res.setHeader('Set-Cookie', serialized)
      res.status(200).json({ success: true, data: result })
    } else {
      res.json({
        success: false,
        errors: { usernameError: 'Wrong passwod or username!' },
      })
    }
  }
}
