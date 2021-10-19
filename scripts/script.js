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

const sortEventList = () => {
  eventList.sort((a, b) => {
    const aDate = new Date(` ${a.startdate} ${a.starttime}`)
    const bDate = new Date(` ${b.startdate} ${b.starttime}`)
    if(aDate < bDate) {
      return -1
    }
    if(bDate < aDate) {
      return 1
    }
    return 0
  })
  console.log(eventList)
}

const getEventInfo = () => {
  const nextEvent = eventList.find((event) => {
    const nowDate = new Date()
    const tenMinutesBeforeDate = new Date(nowDate.getTime() - 10 * 60000)
    const eventDate = new Date(` ${event.startdate} ${event.starttime}`)
    return tenMinutesBeforeDate < eventDate
  })

  if(nextEvent === undefined) return ('Event List is empty!')

  const nowDate = new Date()
  const nextEventDate = new Date(` ${nextEvent.startdate} ${nextEvent.starttime}`)
  const nextEventTenMinutesLaterDate = new Date(nextEventDate.getTime() + 10 * 60000)

  if(nowDate >= nextEventDate && nowDate < nextEventTenMinutesLaterDate) {
    return ('Now Event is: ' + nextEvent.name)
  }

  return ('Next Event is: ' + nextEvent.name)
}

const updateEventInfoText = () => {
  const eventInfoElement = document.getElementById('eventinfo')
  eventInfoElement.innerHTML = getEventInfo()
}

const submitMenu = () => {
  const menuForm = document.getElementById('form')
  const event = {
    name: menuForm.name.value,
    type: menuForm.type.value,
    startdate: menuForm.startdate.value,
    starttime: menuForm.starttime.value,
    finishdate: menuForm.finishdate.value,
    finishtime: menuForm.finishtime.value,
    backgroundPath: menuForm.background.value,
    songPath: menuForm.song.value
  }
  eventList.push(event)
  sortEventList()
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
