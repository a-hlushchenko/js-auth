export const REG_EXP_EMAIL = new RegExp(
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/,
)
export const REG_EXP_PASSWORD = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
)

export class Form {
  FIELD_NAME = {}
  FIELD_ERROR = {}

  value = {}
  error = {}
  disabled = true

  change = (name, value) => {
    const error = this.validate(name, value)
    this.value[name] = value

    if (error) {
      this.setError(name, error)
      this.error[name] = error
    } else {
      this.setError(name, null)
      delete this.error[name]
    }

    if (
      name === this.FIELD_NAME.PASSWORD &&
      this.FIELD_NAME.passwordAgain
    ) {
      const passwordAgain = document.querySelector(
        "*[name='passwordAgain']",
      )

      if (passwordAgain.value.length > 0) {
        this.change(passwordAgain.name, passwordAgain.value)
      }
    }

    this.checkDisabled()
  }

  setError = (name, error) => {
    const span = document.querySelector(
      `.form__error[name=${name}]`,
    )

    const field = document.querySelector(
      `.validation[name=${name}]`,
    )

    if (span) {
      span.classList.toggle(
        'form_error--active',
        Boolean(error),
      )
      span.innerText = error || ''
    }

    if (field) {
      field.classList.toggle(
        'validation--active',
        Boolean(error),
      )
    }
  }

  checkDisabled = () => {
    let disabled = false

    Object.values(this.FIELD_NAME).forEach((name) => {
      if (
        this.error[name] ||
        this.value[name] === undefined
      ) {
        disabled = true
      }
    })

    const btn = document.querySelector('.button')

    if (btn) {
      btn.classList.toggle(
        'button--disabled',
        Boolean(disabled),
      )
    }

    if (disabled === false) {
      this.setAlert('disbled')
    }

    this.disabled = disabled
  }

  validateAll = () => {
    Object.values(this.FIELD_NAME).forEach((name) => {
      const error = this.validate(name, this.value[name])

      if (error) {
        this.setError(name, error)
        this.setAlert(
          'error',
          'Помилка, заповніть всі поля!',
        )
      }
    })
  }

  setAlert = (status, text) => {
    const alert = document.querySelector('.alert')

    if (status === 'progress') {
      alert.classList = 'alert alert--progress'
    } else if (status === 'success') {
      alert.classList = 'alert alert--success'
    } else if (status === 'error') {
      alert.classList = 'alert alert--error'
    } else {
      alert.classList = 'alert alert--disabled'
    }

    if (text) {
      alert.innerText = text
    }
  }
}
