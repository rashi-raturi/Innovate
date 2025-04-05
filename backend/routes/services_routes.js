const express = require('express')
const {recommend} = require('../controllers/ai_recommendation')

const router = express.Router()

router.route('/recommend').post(recommend)


module.exports = router