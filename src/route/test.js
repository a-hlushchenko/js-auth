const express = require('express')
const router = express.Router()

const { Confirm } = require('../class/confirm')

// const nodemailer = require('nodemailer')
// const directTransport = require('nodemailer-direct-transport')
// const fromHost = `mail.my`
// const from = 'glantoshka' + '@' + fromHost
// const to = 'glantoshka@gmail.com'
// const transport = nodemailer.createTransport(
//   directTransport({
//     name: fromHost,
//   }),
// )

// transport.sendMail(
//   {
//     from,
//     to,
//     subject: 'Код',
//     html: `<h1>123456</h1>`,
//   },
//   (err, data) => {
//     if (err) {
//       console.error('Помилка', err)
//     } else {
//       console.log('Надіслано')
//     }
//   },
// )

// ========================================

const email = 'glantoshka@gmail.com'

// Confirm.create(email)

router.get('/test', function (req, res) {
  res.render('test', {
    name: 'test',
    component: [],
    title: 'test',
    data: {},
  })
})

module.exports = router
