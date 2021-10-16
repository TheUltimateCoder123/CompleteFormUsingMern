const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const path = require('path')
const hbs = require('hbs')
const Register = require('./models/registers')
const { ppid } = require('process')

const static_path = path.join(__dirname, '../public')
const template_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')
app.use(express.static(static_path))
app.use(express.json())
/*The Above Line  Work through Post man but you have to use line below to work without post man*/
app.use(express.urlencoded({ extended: false }))

require('./db/conn')
app.set('view engine', 'hbs')
app.set('views', template_path)
hbs.registerPartials(partials_path)

app.get('/', (req, res) => {
  res.render('index')
})
app.get('/register', (req, res) => {
  res.render('register')
})
app.get('/login', (req, res) => {
  res.render('login')
})
app.post('/register', async (req, res) => {
  const password = req.body.password
  const confirmPassword = req.body.confirmPassword
  if (password === confirmPassword) {
    const registerEmployee = new Register({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone,
      email: req.body.Email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    })

    /**Hashing is Done Here That is above save method. It is written on register.js as we call .pre Method */

    const registered = await registerEmployee.save()
    res.render('index')
  } else {
    res.send('Password Donot Match')
  }
})
app.post('/login', async (req, res) => {
  try {
    const email = req.body.Email
    const password = req.body.password
    const userDetails = await Register.findOne({ email: email })
    console.log(userDetails)
    if (userDetails.password === password) {
      res.status(201).render('index')
    } else {
      res.send('Invalid Login Credentials')
    }
  } catch (error) {
    res.status(400).send(error)
  }
})

app.listen(port, () => {
  console.log(`Listening to port${port}`)
})
