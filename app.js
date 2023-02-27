const express = require('express')
const app = express()
const { engine } = require('express-handlebars')

//database
const mongoose = require('mongoose')

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGODB_URL)

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
})

const User = mongoose.model('User', userSchema)

//views
app.engine('hbs', engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')

//middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async function (req, res, next) {
  const users = await User.find({}).lean()
  res.render('main', { users })
})

app.get('/register', function (req, res, next) {
  res.render('register')
})

app.post('/register', async function (req, res, next) {
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

app.listen(3000, function () {
  console.log('App listening port 3000')
})
