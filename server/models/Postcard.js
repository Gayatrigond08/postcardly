import mongoose from "mongoose";

const postcardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    template: {
      type: String,
      default: "Classic",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Postcard = mongoose.model("Postcard", postcardSchema);

export default Postcard;