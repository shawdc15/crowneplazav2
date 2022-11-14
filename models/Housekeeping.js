const mongoose = require('mongoose')

const HousekeepingSchema = new mongoose.Schema({
  roomNo: {
    type: String,
  },
  roomFloor: {
    type: String,
  },
  roomName: {
    type: String,
  },
  roomStatus: {
    type: String,
  },
  reservationStatus: {
    type: String,
  },
  cleanBedroom: {
    type: {
      taskStatus: { type: String },
      notes: { type: String },
    },
  },
  cleanToilet: {
    type: {
      taskStatus: { type: String },
      notes: { type: String },
    },
  },
  cleanWindows: {
    type: {
      taskStatus: { type: String },
      notes: { type: String },
    },
  },
  cleanFridge: {
    type: {
      taskStatus: { type: String },
      notes: { type: String },
    },
  },
  cleanFurnitures: {
    type: {
      taskStatus: { type: String },
      notes: { type: String },
    },
  },
  cleanBathtub: {
    type: {
      taskStatus: { type: String },
      notes: { type: String },
    },
  },
  sweepFloor: {
    type: {
      taskStatus: { type: String },
      notes: { type: String },
    },
  },
  mopFloor: {
    type: {
      taskStatus: { type: String },
      notes: { type: String },
    },
  },
  emptyTrash: {
    type: {
      taskStatus: { type: String },
      notes: { type: String },
    },
  },
  changeBedsheets: {
    type: {
      taskStatus: { type: String },
      notes: { type: String },
    },
  },
  changePillowCase: {
    type: {
      taskStatus: { type: String },
      notes: { type: String },
    },
  },
  changeBlankets: {
    type: {
      taskStatus: { type: String },
      notes: { type: String },
    },
  },
  changeTowels: {
    type: {
      taskStatus: { type: String },
      notes: { type: String },
    },
  },
  changeTrashBags: {
    type: {
      taskStatus: { type: String },
      notes: { type: String },
    },
  },
  replaceToiletries: {
    type: {
      taskStatus: { type: String },
      notes: { type: String },
    },
  },
  replaceRugs: {
    type: {
      taskStatus: { type: String },
      notes: { type: String },
    },
  },
  others1: {
    type: {
      taskStatus: { type: String },
      notes: { type: String },
    },
  },
  others2: {
    type: {
      taskStatus: { type: String },
      notes: { type: String },
    },
  },
  others3: {
    type: {
      taskStatus: { type: String },
      notes: { type: String },
    },
  },
  cleaner: {
    type: String,
  },
  verifiedBy: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports =
  mongoose.models.Housekeeping ||
  mongoose.model('Housekeeping', HousekeepingSchema)
