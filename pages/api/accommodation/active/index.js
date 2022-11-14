import dbConnect from '../../../../utils/dbConnect'
import Accomodation from '../../../../models/Accomodation'

dbConnect()

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const accomodation = await Accomodation.find({ roomStatus: 'Active' })
        // const accomodation = await Accomodation.aggregate([
        //   {
        //     $match: { roomStatus: 'Active' },
        //   },
        //   {
        //     $group: {
        //       _id: { roomName: '$roomName' },
        //       data: { $push: '$$ROOT' },
        //     },
        //   },
        //   {
        //     $project: {
        //       _id: 0,
        //       data: 1,
        //     },
        //   },
        // ])
        res.status(200).json({
          success: true,
          data: accomodation,
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
