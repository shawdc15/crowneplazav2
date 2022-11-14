import dbConnect from '../../../utils/dbConnect'
import Housekeeping from '../../../models/Housekeeping'

dbConnect()

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req
  //
  switch (method) {
    case 'GET':
      try {
        const housekeeping = await Housekeeping.findById(id)
        res.status(200).json({
          success: true,
          data: housekeeping,
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const housekeeping = await Housekeeping.findByIdAndUpdate(
          id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        )
        if (housekeeping) {
          return res.status(200).json({ success: true, message: housekeeping })
        }
        return res.status(400).json({ success: false })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
