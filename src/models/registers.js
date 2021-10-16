const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const employeeSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
})

/**.pre()method execution flow is above .save() method in app.js*/
employeeSchema.pre('save', async function (next) {
  //Note No arrow function is used Here.
  try {
    if (this.isModified('password')) {
      /**The EmployeeSchema password is to be updated with hashed password so we require this.password =hashed password */
      this.password = await bcrypt.hash(this.password, 10)
      this.confirmPassword = undefined
    }
    next()
  } catch (error) {
    console.log(error)
  }
})

const Register = new mongoose.model('Register', employeeSchema)
module.exports = Register
