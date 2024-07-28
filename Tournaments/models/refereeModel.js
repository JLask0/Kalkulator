const mongoose = require("mongoose");

const refereeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  uefaId: {
    type: String,
    required: [true, "UEFA ID is required"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  province: {
    type: String,
    required: [true, "Province is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
  },
  experienceYears: {
    type: Number,
    required: [true, "Experience years is required"],
  },
  judgeAge: {
    type: Number,
    required: [true, "Judge age is required"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Referee",
    required: [true, "User ID is required"],
  },
  verification: {
    type: Boolean,
    
  },
},
{ timestamps: true });

const Referee = mongoose.model("Referee", refereeSchema);
module.exports = Referee;