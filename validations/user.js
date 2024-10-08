import { body } from "express-validator";

export const registerValidation = [
  body('email').isEmail(),
  body('password').isLength({min: 6}),
  body('name').isLength({min: 2})
]

export const loginValidation = [
  body('email').isEmail(),
  body('password').isLength({min: 6}),
]