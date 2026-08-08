import mongoose from "mongoose";

const postcardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    to: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    from: {
      type: String,
      required: true,
    },

    template: {
      type: String,
      default: "Classic Letter",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "created"],
      default: "draft",
    },

    downloadedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Postcard = mongoose.model("Postcard", postcardSchema);

export default Postcard;