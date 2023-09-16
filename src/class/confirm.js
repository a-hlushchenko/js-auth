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
}

module.exports = {
  Confirm,
}
