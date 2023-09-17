import { Form } from '../../script/form'

import {
  saveSession,
  getTokenSession,
  getSession,
} from '../../script/session'

class SignupConfirmForm extends Form {
  FIELD_NAME = {
    CODE: 'code',
  }
  FIELD_ERROR = {
    IS_EMPTY: 'Заповніть поле',
    IS_BIG: 'Значення дуже довге',
  }

  validate = (name, value) => {
    if (String(value).length < 1 || value === undefined) {
      return this.FIELD_ERROR.IS_EMPTY
    }

    if (String(value).length > 30) {
      return this.FIELD_ERROR.IS_BIG
    }
  }

  submit = async () => {
    if (this.disabled) {
      this.validateAll()
    } else {
      this.setAlert('progress', 'Завантаження...')

      try {
        const res = await fetch('/signup-confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.convertData(),
        })

        const data = await res.json()

        if (res.ok) {
          saveSession(data.session)
          location.assign('/')
        } else {
          this.setAlert('error', data.message)
        }
      } catch (error) {
        this.setAlert(
          'error',
          'Помилка реєстрації, спробуйте ще раз!',
        )
      }
    }
  }

  convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.CODE]: Number(
        this.value[this.FIELD_NAME.CODE],
      ),
      token: getTokenSession(),
    })
  }
}

window.signupConfirmForm = new SignupConfirmForm()

document.addEventListener('DOMContentLoaded', () => {
  if (window.session) {
    if (window.session.user.isConfirm) {
      location.assign('/')
    }
  } else {
    location.assign('/')
  }

  document
    .querySelector('#renew')
    .addEventListener('click', (e) => {
      e.preventDefault()

      const session = getSession()

      location.assign(
        `/signup-confirm?renew=true&email=${session.user.email}`,
      )
    })
})
