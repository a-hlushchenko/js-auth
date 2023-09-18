const express = require('express')
const router = express.Router()

const { User } = require('../class/user')

router.get('/user-list', function (req, res) {
  res.render('user-list', {
    name: 'user-list',
    component: ['back-button'],
    title: 'Список користувачів',
    data: {},
  })
})

router.get('/user-list-data', function (req, res) {
  const list = User.getList()

  console.log(list)

  if (list.length === 0) {
    return res.status(400).json({
      message: `Список користувачів порожній!`,
    })
  }

  return res.status(200).json({
    list: list.map(({ id, email, role }) => ({
      id,
      email,
      role,
    })),
  })
})

router.get('/user-item', function (req, res) {
  res.render('user-item', {
    name: 'user-item',
    component: ['back-button'],
    title: 'Інформація про користувача',
    data: {},
  })
})

router.get('/user-item-data', function (req, res) {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({
      message: `Помилка!`,
    })
  }

  const user = User.getById(Number(id))

  if (!user) {
    return res.status(400).json({
      message: `Користувача не існує!`,
    })
  }

  return res.status(200).json({
    user: {
      id: id,
      email: user.email,
      role: user.role,
      isConfirm: user.isConfirm,
    },
  })
})

module.exports = router
