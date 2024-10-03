import express from 'express'
import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://oxelolol:oxelolol@cluster0.nf0byg1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(res => {
  console.log('подключились к бд')
}).catch(e => console.log(e))

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/bye', (req, res) => {
  res.send('bye world')
})

app.listen(3000, () => {
  console.log('server is working')
})