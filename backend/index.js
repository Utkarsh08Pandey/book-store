const express = require('express')
const cors = require('cors')
const app = express()
const books = require('./route/bookRoute.js')

require('./dbconfig.js')
require('dotenv').config()

app.use(express.json())
app.use(cors())
app.use('/books',books)


const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is listening on port:${PORT}`)
})