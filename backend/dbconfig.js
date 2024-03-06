const mongoose = require('mongoose')

require('dotenv').config()
const URL = process.env.URL

mongoose.connect(URL)
        .then(console.log('db connected'))
        .catch((e)=>console.log(e))