import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
})

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  text: {
    type: String,
    required: true
  }
})

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  imageUrl: String,
  likes: [likeSchema],
  comments: [commentSchema]
}, {timestamps: true})

export default mongoose.model('post', postSchema)