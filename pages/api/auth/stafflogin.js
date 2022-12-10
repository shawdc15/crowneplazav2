import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'
import dbConnect from '../../../utils/dbConnect'
import Staff from '../../../models/Staff'

dbConnect()

const secret = process.env.SECRET

export default async (req, res) => {
  const { email, password } = req.body
  let newError = {}
  if (email?.trim() == '' || email == undefined) {
    newError = { ...newError, emailError: 'Please enter email!' }
  }
  if (password?.trim() == '' || password == undefined) {
    newError = { ...newError, passwordError: 'Please enter password!' }
  }
  if (
    newError.hasOwnProperty('emailError') ||
    newError.hasOwnProperty('passwordError')
  ) {
    res.json({
      success: false,
      errors: newError,
    })
  } else {
    let result = null
    try {
      const user = await Staff.findOne({
        email,
        password,
        status: true,
      }).select(['-password', '-__v'])
      result = user
    } catch (error) {
      console.log(error)
    }

    if (result) {
      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          id: result._id,
          role: result.role,
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
        errors: { emailError: 'Wrong password or email!' },
      })
    }
  }
}
