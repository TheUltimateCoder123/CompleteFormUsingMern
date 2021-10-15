const mongoose = require('mongoose')
mongoose
  .connect('mongodb://localhost:27017/regDBase')
  .then(() => {
    console.log('Connection Established')
  })
  .catch((err) => {
    console.log(err)
  })
