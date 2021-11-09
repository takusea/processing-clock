class Dialog extends EventTarget {
  constructor(element) {
    super()
    this.element = element

    const closeButton = this.element.querySelector('.dialog__close')
    if (closeButton) closeButton.addEventListener('click', () => { this.close() })

    const submitButton = this.element.querySelector('.dialog__submit')
    if (submitButton) submitButton.addEventListener('click', () => { this.submit() })

    const resetButton = this.element.querySelector('.dialog__reset')
    if (resetButton) resetButton.addEventListener('click', () => { this.reset() })
  }

  addEventToButton(className, event) {
    const button = this.element.querySelector(className)
    if (!button) return
    button.addEventListener('click', () => { event })
  }

  open() {
    this.element.classList.add('dialog--open')
  }

  close() {
    this.element.classList.remove('dialog--open')
    this.dispatchEvent(new CustomEvent('close'))
  }

  submit() {
    this.dispatchEvent(new CustomEvent('submit'))
  }

  reset() {
    this.dispatchEvent(new CustomEvent('reset'))
  }
}
