import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'

dbConnect()

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        const user = await User.findById(id)
        res.status(200).json({
          success: true,
          data: user,
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        }).select(['-password', '-__v', '-role'])
        if (user) {
          return res.status(200).json({
            success: true,
            data: user,
          })
        }
        return res
          .status(400)
          .json({ success: false, errors: ['Session expired'] })
      } catch (error) {
        const err = error.errors
        res.status(400).json({
          success: false,
          error: error,
          errors: {
            firstNameError: err?.firstName?.message,
            lastNameError: err?.lastName?.message,
            usernameError:
              error.code === 11000
                ? 'Username already exist!'
                : err?.username?.message,
            emailError: err?.email?.message,
            passwordError: err?.password?.message,
            ageError: err?.age?.message,
            contactError: err?.contact?.message,
          },
        })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
