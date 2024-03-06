const express = require('express')
const {create,read,readOne,update,deleteBook } = require('../controller/bookController.js')
const router = express.Router()

router.post('/',create)
router.get('/',read)
router.get('/:id',readOne)
router.put('/:id',update)
router.delete('/:id',deleteBook)

module.exports = router