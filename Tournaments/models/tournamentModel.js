const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ratingSchema = new mongoose.Schema({
  idUzytkownika: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  ocena: {
    type: Number,
    required: [true, "Rating is required"],
  },
});

const tournamentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    province: {
      type: String,
      required: [true, "Province is required"],
    },
    street: {
      type: String,
      required: [true, "Street is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    buildingAddress: {
      type: String,
      required: [true, "Building Address is required"],
    },
    time: {
      type: Date,
      required: [true, "Time is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    referee: {
      type: mongoose.Types.ObjectId,
      ref: "Referee",
    },
    ratings: [ratingSchema],
    comments: [
      {
        text: String,
        created: { type: Date, default: Date.now },
        user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },]
  },
  { timestamps: true }
);
tournamentSchema.virtual("overall").get(function () {
  if (this.ratings && this.ratings.length > 0) {
    const totalRating = this.ratings.reduce((acc, rating) => acc + rating.ocena, 0);
    return totalRating;
  }
  return 0;
});

const tournamentModel = mongoose.model("Tournament", tournamentSchema);
module.exports = tournamentModel;
