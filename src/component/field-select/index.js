class FieldSelect {
  static toggle = (target) => {
    const options = target.nextElementSibling

    options.toggleAttribute('active')

    setTimeout(() => {
      window.addEventListener(
        'click',
        (e) => {
          if (!options.parentElement.contains(e.target)) {
            options.removeAttribute('active')
          }
        },
        { once: true },
      )
    })
  }

  static change = (target) => {
    const options = target.parentElement
    options.toggleAttribute('active')

    const field = document.querySelector('.field__value')
    field.classList.remove('field__value--placeholder')
    field.innerText = target.innerText

    const active = options.querySelector('*[active]')
    if (active) {
      active.toggleAttribute('active')
    }

    target.toggleAttribute('active')
  }
}

window.fieldSelect = FieldSelect
