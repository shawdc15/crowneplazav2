import dbConnect from '../../../../utils/dbConnect'
import Accomodation from '../../../../models/Accomodation'

dbConnect()

export default async (req, res) => {
  const {
    method,
    query: { id },
  } = req

  switch (method) {
    case 'GET':
      try {
        const accommodation = await Accomodation.findById(id)
        res.status(200).json({
          success: true,
          data: accommodation,
        })
      } catch (error) {
        res.status(400).json({ success: false, errors: error.message })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
