const express = require('express')
const { getAllMeals, placeOrder } = require('../controllers/canteen')

const router = express.Router()

router.route('/menu').get(getAllMeals)
router.route('/order').post(placeOrder)

module.exports = router