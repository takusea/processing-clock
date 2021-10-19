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
