import dbConnect from '../../../utils/dbConnect'
import Accomodation from '../../../models/Accomodation'

dbConnect()

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        const accomodation = await Accomodation.findById(id)
        res.status(200).json({
          success: true,
          data: accomodation,
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const accomodation = await Accomodation.findByIdAndUpdate(
          id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        )
        if (accomodation) {
          return res.status(200).json({ success: true, data: accomodation })
        }
        return res.status(400).json({ success: false })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        const accomodation = await Accomodation.deleteOne({ _id: id })

        if (!accomodation) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
