import express from 'express'
import mongoose from 'mongoose'
import { loginValidation, registerValidation } from './validations/user.js'
import {config} from 'dotenv'
import { loginController, myInfo, registerController } from './controllers/user.js'
import { checkAuth } from './middlewares/checkAuth.js'
import { createPostValidation } from './validations/post.js'
import { allPosts, createPost } from './controllers/post.js'

config()
mongoose.connect(process.env.DATA_BASE).then(res => {
  console.log('подключились к бд')
}).catch(e => console.log(e))

const app = express()
app.use(express.json())

app.post('/register', registerValidation, registerController)
app.post('/login', loginValidation, loginController)
app.get('/myinfo', checkAuth, myInfo)

app.post('/createpost', checkAuth, createPostValidation, createPost)
app.get('/posts', checkAuth, allPosts)

app.listen(3000, () => {
  console.log('server is working')
})