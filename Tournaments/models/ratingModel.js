const mongoose = require("mongoose");
const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: [true, "user id is required"],
    },
    ocena: {
        type: Number,
        required: true,
    },
    tournamentId: {
        type: mongoose.Types.ObjectId,
        ref: "Tournament",
        require: [true, "tournament id is required"],
    },
},
    { timestamps: true });

const ratingModel = mongoose.model('Rating', ratingSchema);
module.exports = ratingModel;