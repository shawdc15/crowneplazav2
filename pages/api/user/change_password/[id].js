import dbConnect from '../../../../utils/dbConnect'
import User from '../../../../models/User'

dbConnect()

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req
  switch (method) {
    case 'PUT':
      const { newPassword, oldPassword, confirmPassword } = req.body
      let newError = {}
      if (newPassword?.trim() == '' || newPassword == undefined) {
        newError = {
          ...newError,
          newPasswordError: 'Please enter new password!',
        }
      }
      if (oldPassword?.trim() == '' || oldPassword == undefined) {
        newError = {
          ...newError,
          oldPasswordError: 'Please enter old password!',
        }
      }
      if (
        confirmPassword?.trim() == '' ||
        newPassword?.trim() == '' ||
        confirmPassword == undefined ||
        newPassword == undefined ||
        confirmPassword?.trim() != newPassword?.trim()
      ) {
        newError = { ...newError, confirmPasswordError: 'Password mismatch!' }
      }
      if (Object.keys(newError).length > 0) {
        res.status(400).json({
          success: false,
          errors: newError,
        })
      } else {
        try {
          const user = await User.findOneAndUpdate(
            { _id: id, password: oldPassword },
            {
              password: newPassword,
            },
            {
              new: true,
              runValidators: true,
            }
          )
          if (user) {
            return res.status(200).json({ success: true })
          }
          return res.status(400).json({
            success: false,
            errors: {
              oldPasswordError: 'Wrong Password',
            },
          })
        } catch (error) {
          console.log(error)
          const err = error.errors
          res.status(400).json({
            success: false,
            errors: {
              newPasswordError: err?.password?.message,
            },
          })
        }
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
