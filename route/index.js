const express = require('express')
const router = express.Router()

router.use('/api/masters', require('./genericAPI.route'))

module.exports = router;