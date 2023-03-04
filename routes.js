const { Router } = require('express')
const bcrypt = require('bcrypt')
const router = Router()
const User = require('./models/user')
const authMiddleware = require('./middlewares/auth')

router.get('/', authMiddleware, async function (req, res, next) {
  const users = await User.find({}).lean()
  res.render('main', { users })
})

router.get('/users', async function (req, res, next) {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

router.get('/register', function (req, res, next) {
  res.render('register')
})

router.post('/register', async function (req, res, next) {
  try {
    const newUser = new User(req.body)
    newUser.password = await bcrypt.hash(newUser.password, 10)
    await newUser.save()
    console.log(newUser)
    res.redirect('/')
  } catch (e) {
    console.log(e)
    res.redirect('/')
  }
})

router.get('/login', function (req, res, next) {
  res.render('login')
})

router.post('/login', async function (req, res, next) {
  const payload = req.body
  const user = await User.findOne({ email: payload.email })
  const passwordIsOk = await bcrypt.compare(payload.password, user.password)
  if (!user || !passwordIsOk) {
    res.status(404).send('Unauthorized')
  } else {
    req.session.userId = user._id
    res.redirect('/')
  }
})

module.exports = router
