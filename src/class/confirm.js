const nodemailer = require('nodemailer')

class Confirm {
  static #list = []

  constructor(data) {
    this.code = Confirm.generateCode()
    this.data = data
  }

  static generateCode = () => {
    return Math.floor(Math.random() * 9000) + 1000
  }

  static create = (data) => {
    const item = new Confirm(data)
    this.#list.push(item)

    setTimeout(() => {
      this.delete(item.code)
    }, 1000 * 60 * 60 * 24)

    this.sendMail(data, item.code)

    console.log(this.#list)
  }

  static delete = (code) => {
    const length = this.#list

    this.#list = this.#list.filter((el) => el.code !== code)

    return length > this.#list
  }

  static getData = (code) => {
    const data = this.#list.find(
      (el) => el.code === code,
    ).data

    return data || null
  }

  static sendMail = (email, code) => {
    console.log('CODE======', code)
    let mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'glantoshka@gmail.com',
        pass: 'npkwbucumxojztfj',
      },
    })

    let mailDetails = {
      from: 'glantoshka@gmail.com',
      to: email,
      subject: 'Код підтвердження',
      html: `<h1>${code}</h1>`,
    }

    mailTransporter.sendMail(
      mailDetails,
      function (err, data) {
        if (err) {
          console.log('Error Occurs: ' + err)
        } else {
          console.log('Email sent successfully: ' + data)
        }
      },
    )
  }
}

module.exports = {
  Confirm,
}
