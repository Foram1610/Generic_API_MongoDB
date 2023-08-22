const express = require('express')
const router = express.Router()
const genericAPI = require('../controller/genericAPI.controller')

router.post('/:modelName', genericAPI.add)
router.put('/:modelName/:id', genericAPI.update)
router.delete('/:modelName/:id', genericAPI.delete)
router.post('/:modelName/getByID/:id', genericAPI.getById)
router.post('/:modelName/find', genericAPI.getAll)

module.exports = router;