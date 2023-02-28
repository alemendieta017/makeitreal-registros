const { Router } = require('express')
const router = Router()
const User = require('./models/user')

router.get('/', async function (req, res, next) {
  const users = await User.find({}).lean()
  res.render('main', { users })
})

router.get('/register', function (req, res, next) {
  res.render('register')
})

router.post('/register', async function (req, res, next) {
  try {
    const newUser = new User(req.body)
    await newUser.save()
    console.log(newUser)
    res.redirect('/')
  } catch (e) {
    console.log(e)
    res.redirect('/')
  }
})

module.exports = router
