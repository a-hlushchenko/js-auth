const express = require('express')
const router = express.Router()

const { User } = require('../class/user')

User.create({
  email: 'test@gmail.com',
  password: 'Test.123',
  role: 1,
})

router.get('/signup', function (req, res) {
  res.render('signup', {
    name: 'signup',
    component: [
      'back-button',
      'field',
      'field-password',
      'field-checkbox',
      'field-select',
    ],

    title: 'Реєстрація',
    data: {
      role: [
        { value: User.USER_ROLE.USER, text: 'Користувач' },
        {
          value: User.USER_ROLE.ADMIN,
          text: 'Адміністратор',
        },
        {
          value: User.USER_ROLE.DEVELOPER,
          text: 'Розробник',
        },
      ],
    },
  })
})

router.post('/signup', function (req, res) {
  const { email, password, role } = req.body

  if (!email || !password || !role) {
    return res.status(400).json({
      message: `Помилка. Обов'язкові поля відсутні.`,
    })
  }

  try {
    User.create({ email, password, role })

    return res.status(200).json({
      message: 'Користувача успішно зареєстровано',
    })
  } catch (err) {
    return res.status(400).json({
      message: `Помилка створення користувача.`,
    })
  }
})

module.exports = router
