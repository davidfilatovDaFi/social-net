import postModel from '../models/post.js'

export const createPost = async (req, res) => {
  try {
    const doc = new postModel({
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      userId: req.userId
    })

    const post = await doc.save()
    res.json(post)
  } catch (error) {
    console.log(error)
  }
}

export const allPosts = async (req, res) => {
  try {
    const posts = await postModel.find({})
    res.json(posts)
  } catch (error) {
    console.log(error)
  }
}