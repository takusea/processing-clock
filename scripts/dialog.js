class Dialog {
  constructor(id) {
    this.dialog = document.getElementById(id)
  }

  close() {
    this.dialog.classList.remove('dialog--open')
  }
  
  open() {
    this.dialog.classList.add('dialog--open')
  }
}
