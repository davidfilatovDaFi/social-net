import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  
  if (token) {
    const data = jwt.verify(token, process.env.SECRET_KEY)
    console.log(data)

    req.userId = data._id
    next()
  } else {
    res.status(400).json({message: 'Неверный токен'})
  }
  
}