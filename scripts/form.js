const initForm = () => {
  const menuForm = document.getElementById('form')
  menuForm.reset()

  const requiredInputList = form.querySelectorAll('[required]')
  requiredInputList.forEach(element => {
    element.classList.remove('text-field--invalid')
  })

  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  menuForm.startdate.value = `${year}-${month}-${day}`
  menuForm.finishdate.value = `${year}-${month}-${day}`

  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  menuForm.starttime.value = `${hour}:${minute}`
  menuForm.finishtime.value = `${hour}:${minute}`
}

const validateForm = (form) => {
  const requiredInputList = form.querySelectorAll('[required]')
  const InvalidInputList = [...requiredInputList].filter(element => {
    return element.value === ''
  })

  requiredInputList.forEach(element => {
    element.classList.remove('text-field--invalid')
  })

  if(InvalidInputList.length <= 0) {
    return true
  }
  else {
    InvalidInputList.forEach(element => {
      element.classList.add('text-field--invalid')
    })
    return false
  }
}

const submitForm = () => {
  const menuForm = document.getElementById('form')

  if(!validateForm(menuForm)) return false

  const event = {
    name: menuForm.name.value,
    startdate: menuForm.startdate.value,
    starttime: menuForm.starttime.value,
    finishdate: menuForm.finishdate.value,
    finishtime: menuForm.finishtime.value,
    backgroundFile: menuForm.background.files[0],
    songFile: menuForm.song.files[0],
    goodCount: 0
  }
  eventList.push(event)
  return true
}
