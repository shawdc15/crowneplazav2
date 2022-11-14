import dbConnect from '../../../utils/dbConnect'
import Housekeeping from '../../../models/Housekeeping'

dbConnect()

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const housekeeping = await Housekeeping.find()
        res.status(200).json({
          success: true,
          data: housekeeping,
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const { roomName, roomNo, date } = req.body
        const housekeeping_check = await Housekeeping.find({
          roomName,
          roomNo,
          date,
        })
        if (!housekeeping_check.length) {
          const housekeeping_add = await Housekeeping.create(req.body)
          res.status(201).json({ success: true, data: housekeeping_add })
        } else {
          const housekeeping_update = await Housekeeping.findByIdAndUpdate(
            housekeeping_check[0]._id,
            req.body,
            {
              new: true,
              runValidators: true,
            }
          )
          if (housekeeping_update) {
            return res
              .status(200)
              .json({ success: true, data: housekeeping_update })
          }
          return res.status(400).json({ success: false })
        }
      } catch (error) {
        res.status(400).json({
          success: false,
          errors: error,
        })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
