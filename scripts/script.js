const eventList = []

const nowWeek = () => {
  const date = new Date()
  const nowWeekValue = date.getDay()
  const nowWeek = ['日', '月', '火', '水', '木', '金', '土'][nowWeekValue]
  return nowWeek
}

const changeClockBackground = (sourceFile) => {
  const imageElement = document.getElementById('clock-bg')
  const fileUrl = URL.createObjectURL(sourceFile)
  imageElement.src = fileUrl
}

const removeClockBackground = () => {
  const imageElement = document.getElementById('clock-bg')
  imageElement.src = ''
}

const playAudioFromFile = (sourceFile) => {
  const audioElement = document.getElementById('audio')
  const fileUrl = URL.createObjectURL(sourceFile)
  audioElement.src = fileUrl
  audioElement.play()
}

const stopAudio = () => {
  const audioElement = document.getElementById('audio')
  audioElement.pause()
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

const sortEventList = () => {
  eventList.sort((a, b) => {
    const aDate = new Date(` ${a.startdate} ${a.starttime}`)
    const bDate = new Date(` ${b.startdate} ${b.starttime}`)
    if(aDate < bDate) return -1
    if(bDate < aDate) return 1
    return 0
  })
}

const getNowEvent = () => {
  return eventList.find((event) => {
    const nowDate = new Date()
    const eventStartDate = new Date(` ${event.startdate} ${event.starttime}`)
    const eventFinishDate = new Date(` ${event.finishdate} ${event.finishtime}`)
    return eventStartDate <= nowDate && eventFinishDate > nowDate
  })
}

const getNextEvent = () => {
  return eventList.find((event) => {
    const nowDate = new Date()
    const eventFinishDate = new Date(` ${event.finishdate} ${event.finishtime}`)
    return eventFinishDate > nowDate
  })
}

const getEventInfo = () => {
  const nowEvent = getNowEvent()
  if(nowEvent) {
    return ('Now Event is: ' + nowEvent.name)
  }

  const nextEvent = getNextEvent()
  if(nextEvent) {
    return ('Next Event is: ' + nextEvent.name)
  }

  return 'Event List is empty!'
}

const updateEventInfo = () => {
  const eventInfoElement = document.getElementById('eventinfo')
  eventInfoElement.innerHTML = getEventInfo()

  const nowEvent = getNowEvent()
  if(nowEvent) {
    changeClockBackground(nowEvent.backgroundFile)
    playAudioFromFile(nowEvent.songFile)
  }
  else {
    removeClockBackground()
    stopAudio()
  }
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

const submitMenu = () => {
  const menuForm = document.getElementById('form')

  if(!validateForm(menuForm)) return false

  const event = {
    name: menuForm.name.value,
    startdate: menuForm.startdate.value,
    starttime: menuForm.starttime.value,
    finishdate: menuForm.finishdate.value,
    finishtime: menuForm.finishtime.value,
    backgroundFile: menuForm.background.files[0],
    songFile: menuForm.song.files[0]
  }
  eventList.push(event)
  sortEventList()
  return true
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
  if(submitMenu()) {
    closeDialog()
  }
})
