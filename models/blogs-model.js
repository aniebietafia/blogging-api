const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogsSchema = new Schema({
  imageUrl: {
    type: String,
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  blogBody: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  read_count:{
    type: Number
  },
  reading_time: {
    type: Number
  }
});

module.exports = mongoose.model("Blogs", blogsSchema);
