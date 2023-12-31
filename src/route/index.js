const express = require('express')
const router = express.Router()

const { User } = require('../class/user')

router.get('/', function (req, res) {
  res.render('index', {
    name: 'index',
    component: [],
    title: 'index page',
    data: {},
  })
})

router.get('/home', function (req, res) {
  res.render('home', {
    name: 'home',
    component: [],
    title: 'Головна',
    data: {},
  })
})

router.get('/logout', function (req, res) {
  res.render('logout', {
    name: 'logout',
    component: [],
    title: 'logout',
    data: {},
  })
})

const auth = require('./auth')
router.use('/', auth)

const user = require('./user')
router.use('/', user)

module.exports = router
