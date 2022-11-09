const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogsSchema = new Schema(
  {
    category: {
      type: String,
      enum: [
        "General",
        "Technology",
        "Finance",
        "Religion",
        "Politics",
        "Travels",
      ],
      default: "General",
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    blogBody: {
      type: String,
      required: true,
    },
    reading_time: {
      type: String,
      required: true,
    },
    // read_count: {
    //   type: Number,
    //   required: true,
    // },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogsSchema);
