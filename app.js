require('dotenv').config()
const express = require('express')
const app = express()
var session = require('express-session')
const { engine } = require('express-handlebars')
const routes = require('./routes')

//database
const mongoose = require('mongoose')

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGODB_URL, function (err) {
  if (err) {
    throw err
  } else {
    console.log('[DB] Database connected succesfully')
  }
})

//views
app.engine('hbs', engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')

//middlewares

app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

app.listen(3000, function () {
  console.log('App listening port 3000')
})
