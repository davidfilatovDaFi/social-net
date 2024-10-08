import { validationResult } from 'express-validator'
import userModel from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerController = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) res.status(400).json(errors.array())

    const candidate = await userModel.findOne({email: req.body.email})

    if (candidate) return res.status(400).json({message: 'Пользователь с такой почтой уже есть'})

    const salt = await bcrypt.genSalt(10)

    const passwordHash = await bcrypt.hash(req.body.password, salt)

    const doc = userModel({
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
    })

    const user = await doc.save()

    const {password, ...userData} = user._doc

    const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY, {expiresIn: '10d'})

    res.json({...userData, token})
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

export const loginController = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) res.status(400).json(errors.array())

    const user = await userModel.findOne({email: req.body.email})

    if (!user) return res.status(400).json({message: 'Пользователя с такой почтой нет'})

    const {password, ...userData} = user._doc

    const isVaild = await bcrypt.compare(req.body.password, password)

    if (!isVaild) return res.status(400).json({message: 'Неверный пароль'})

    const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY, {expiresIn: '10d'})

    res.json({...userData, token})
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

export const myInfo = async (req, res) => {
  const user = await userModel.findOne({_id: req.userId})

  if (!user) res.status(400).json({message: 'Такого пользовтеля нет'})

  const {password, ...userData} = user._doc
  
  try {
    res.json(userData)
  } catch (error) {
    console.log(error)
  }

}