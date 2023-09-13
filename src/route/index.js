const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index', {
    name: 'index',
    component: [''],
    title: 'Головна',
    data: {},
  })
})

const auth = require('./auth')
router.use('/', auth)

module.exports = router
