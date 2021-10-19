const eventList = []

const nowWeek = () => {
  const date = new Date()
  const nowWeekValue = date.getDay()
  const nowWeek = ['日', '月', '火', '水', '木', '金', '土'][nowWeekValue]
  return nowWeek
}

const closeDialog = () => {
  const menuDialog = document.getElementById('menu')
  menuDialog.classList.remove('menu--open')

  const menuForm = document.getElementById('form')
  menuForm.reset()
}

const openDialog = () => {
  const menuDialog = document.getElementById('menu')
  menuDialog.classList.add('menu--open')
}

const submitMenu = () => {
  const menuForm = document.getElementById('form')
  const event = {
    name: menuForm.name.value,
    type: menuForm.type.value,
    date: menuForm.date.value,
    time: menuForm.time.value,
    backgroundPath: menuForm.background.value,
    songPath: menuForm.song.value
  }
  console.log(event)
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
  submitMenu()
  closeDialog()
})
