const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const routes = require('./routes')

//database
const mongoose = require('mongoose')

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGODB_URL)

//views
app.engine('hbs', engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')

//middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

app.listen(3000, function () {
  console.log('App listening port 3000')
})
