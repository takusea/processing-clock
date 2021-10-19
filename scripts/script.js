const closeDialog = () => {
  const menuDialog = document.getElementById('menu')
  menuDialog.classList.remove('menu--open')
}

const openDialog = () => {
  const menuDialog = document.getElementById('menu')
  menuDialog.classList.add('menu--open')
}

const openDialogButton = document.getElementById('button-openmenu')
openDialogButton.addEventListener('click', () => {
  openDialog()
})

const cancelButton = document.getElementById('button-cancel')
cancelButton.addEventListener('click', () => {
  closeDialog()
})

const submitButton = document.getElementById('button-submit')
submitButton.addEventListener('click', () => {
  
  closeDialog()
})
