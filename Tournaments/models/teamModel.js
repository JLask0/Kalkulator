const mongoose = require('mongoose');
const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
   logo: {
    type: String,
 },
  players: [
    {
      firstName: String,
      lastName: String,
      shirtNumber: String,
      nickname: String,
      captainPhone: String,
      captainEmail: String,
    },
  ],
  captainIndex: {
    type: Number,
    required: true,
  },
  rodoAgreement: {
    type: Boolean,
    required: true,
  },
  result1: {
    type: Number
  },
  result2: {
    type: Number
  },
  result3: {
    type: Number
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  tournament:
    {
      type: mongoose.Types.ObjectId,
      ref: "Tournament",
      required: [true, 'Team ID is required'],
    },
  
},
{ timestamps: true });
const teamModel = mongoose.model("Team", teamSchema);
module.exports = teamModel;

