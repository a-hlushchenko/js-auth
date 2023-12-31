const express = require('express')
const router = express.Router()

const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')
const { Session } = require('../class/session')

User.create({
  email: 'test@gmail.com',
  password: 'Test.123',
  role: 1,
})

User.create({
  email: 'administrator@gmail.com',
  password: 'Test.123',
  role: 2,
})

User.create({
  email: 'developer@gmail.com',
  password: 'Test.123',
  role: 3,
})

User.create({
  email: 'userqwe@gmail.com',
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
    const user = User.getByEmail(email)

    if (user) {
      return res.status(400).json({
        message: `Користувач з цією поштою вже зареєстрований!`,
      })
    }

    const newUser = User.create({ email, password, role })
    const session = Session.create(newUser)

    Confirm.create(newUser.email)

    return res.status(200).json({
      message: 'Користувача успішно зареєстровано',
      session,
    })
  } catch (err) {
    return res.status(400).json({
      message: `Помилка створення користувача.`,
    })
  }
})

router.get('/recovery', function (req, res) {
  res.render('recovery', {
    name: 'recovery',
    component: ['back-button', 'field'],
    title: 'Відновлення паролю',
    data: {},
  })
})

router.post('/recovery', function (req, res) {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({
      message: `Помилка, введіть пошту!`,
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: `Користувача з цією поштою не існує!`,
      })
    }

    Confirm.create(email)

    return res.status(200).json({
      message: 'Код надіслано!',
    })
  } catch (err) {
    return res.status(400).json({
      message: `Помилка, спробуйте ще раз!`,
    })
  }
})

router.get('/recovery-confirm', function (req, res) {
  const { renew, email } = req.query

  if (renew && email) {
    Confirm.create(email)
  }

  res.render('recovery-confirm', {
    name: 'recovery-confirm',
    component: ['back-button', 'field', 'field-password'],
    title: 'Відновлення паролю',
    data: {},
  })
})

router.post('/recovery-confirm', function (req, res) {
  const { code, password } = req.body

  console.log(code, password)

  if (!code || !password) {
    return res.status(400).json({
      message: `Помилка, обов'язкові поля відсутні!`,
    })
  }

  try {
    const email = Confirm.getData(code)

    if (!email) {
      return res.status(400).json({
        message: `Код не вірний!`,
      })
    }

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: `Користувача з цією поштою не існує!`,
      })
    }

    user.password = password

    console.log(user)

    const session = Session.create(user)

    return res.status(200).json({
      message: 'Пароль змінено!',
      session,
    })
  } catch (err) {
    return res.status(400).json({
      message: `Код не вірний!`,
    })
  }
})

router.get('/signup-confirm', function (req, res) {
  const { renew, email } = req.query

  if (renew && email) {
    Confirm.create(email)
  }

  res.render('signup-confirm', {
    name: 'signup-confirm',
    component: ['back-button', 'field'],
    title: 'Підтвердження пошти',
    data: {},
  })
})

router.post('/signup-confirm', function (req, res) {
  const { code, token } = req.body

  console.log(code, token)

  if (!code || !token) {
    return res.status(400).json({
      message: `Помилка, обов'язкові поля відсутні!`,
    })
  }

  try {
    const session = Session.get(token)

    if (!session) {
      return res.status(400).json({
        message: `Помилка, ви не увійшли в акаунт!`,
      })
    }

    const email = Confirm.getData(code)

    if (!email) {
      return res.status(400).json({
        message: `Код не вірний!`,
      })
    }

    if (email !== session.user.email) {
      return res.status(400).json({
        message: `Код не дійсний!`,
      })
    }

    session.user.isConfirm = true

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: `Користувача з цією поштою не існує!`,
      })
    }

    user.isConfirm = true

    return res.status(200).json({
      message: 'Пароль змінено!',
      session,
    })
  } catch (err) {
    return res.status(400).json({
      message: `Код не вірний!`,
    })
  }
})

router.get('/login', function (req, res) {
  res.render('login', {
    name: 'login',
    component: ['back-button', 'field', 'field-password'],

    title: 'Вхід',
    data: {},
  })
})

router.post('/login', function (req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: `Помилка. Обов'язкові поля відсутні!`,
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: `Користувача з цією поштою не існує!`,
      })
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: `Пароль не вірний!`,
      })
    }

    const session = Session.create(user)

    return res.status(200).json({
      message: 'Вхід успішний!',
      session,
    })
  } catch (e) {
    return res.status(400).json({
      message: `Помилка входу!`,
    })
  }
})

module.exports = router
