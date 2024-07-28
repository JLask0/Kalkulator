const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, 'password must have at least (8) caracters'],
    },
    surname: {
      type: String,
      required: [true, "surname is required"],
    },
    role: {
      type: String,
    },
    verification: {
      type: Boolean,
    },
    tournaments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Tournament",
      },
    ], 
  },
  { timestamps: true }
);
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d"
    });
}
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
