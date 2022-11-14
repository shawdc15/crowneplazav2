import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'

dbConnect()

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const user = await User.find()
        res.status(200).json({
          success: true,
          data: user,
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'POST':
      const {
        username,
        email,
        contact,
        age,
        password,
        lastName,
        firstName,
        confirmPassword,
      } = req.body
      let newError = {}
      if (username?.trim() == '' || username == undefined) {
        newError = { ...newError, usernameError: 'Please enter username!' }
      }
      if (email?.trim() == '' || email == undefined) {
        newError = { ...newError, emailError: 'Please enter email!' }
      }
      if (contact?.trim() == '' || contact == undefined) {
        newError = { ...newError, contactError: 'Please enter contact!' }
      }
      if (age?.trim() == '' || age == undefined) {
        newError = { ...newError, ageError: 'Please enter age!' }
      }
      if (password?.trim() == '' || password == undefined) {
        newError = { ...newError, passwordError: 'Please enter password!' }
      }
      if (lastName?.trim() == '' || lastName == undefined) {
        newError = { ...newError, lastNameError: 'Please enter lastName!' }
      }
      if (firstName?.trim() == '' || firstName == undefined) {
        newError = { ...newError, firstNameError: 'Please enter firstName!' }
      }
      if (
        confirmPassword?.trim() == '' ||
        password?.trim() == '' ||
        confirmPassword == undefined ||
        password == undefined ||
        confirmPassword?.trim() != password?.trim()
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
          const user = await User.create(req.body)
          res.status(201).json({ success: true, data: user })
        } catch (error) {
          console.log(error)
          if (error.code === 11000) {
            if (error.keyPattern?.username) {
              newError = {
                ...newError,
                usernameError: 'Username already exist!',
              }
            }
            if (error.keyPattern?.email) {
              newError = {
                ...newError,
                emailError: 'Email address already exist!',
              }
            }
          }
          res.status(400).json({
            success: false,
            errors: newError,
          })
        }
      }

      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
