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

const eventList = new EventList()

const audioElement = document.getElementById('audio')
const audioPlayer = new AudioPlayer(audioElement)

const updateEventInfo = () => {
  const eventInfoElement = document.getElementById('eventinfo')
  eventInfoElement.innerHTML = eventList.toDisplayText()

  const nowEvent = eventList.nowEvent()
  if(nowEvent) {
    if(nowEvent.backgroundFile) {
      changeClockBackground(nowEvent.backgroundFile)
    }

    if(nowEvent.songFile) {
      audioPlayer.setFile(nowEvent.songFile)
      audioPlayer.play()
    }
  } else {
    removeClockBackground()
    audioPlayer.stop()
  }
}

const initAddEventDialog = () => {
  const dialogElement = document.getElementById('dialog-addevent')
  const addEventDialog = new Dialog(dialogElement)

  const openDialogButton = document.getElementById('button-open-addevent')
  openDialogButton.addEventListener('click', () => {
    addEventDialog.reset()
    addEventDialog.open()
  })

  addEventDialog.addEventListener('submit', () => {
    if(submitForm()) {
      addEventDialog.close()
    }
  })

  addEventDialog.addEventListener('reset', () => { initForm() })
}
initAddEventDialog()

const updateEventList = () => {
  const eventListElement = document.getElementById('eventlist')
  const eventListHTML = eventList.map((event, index) => `
    <li class="event">
      <h3 class="event__title">${event.name}</h3>
      <button class="button button--danger event__button event__button-delete" data-index="${index}">削除</button>
      <button class="button event__button event__button-detail">…</button>
      <div class="event__detail">
        <h4 class="event__heading">はじまり</h4>
        <p>${event.startdate} ${event.starttime}</p>
        <h4 class="event__heading">おわり</h4>
        <p>${event.finishdate} ${event.finishtime}</p>
      </div>
    </li>
  `)
  eventListElement.innerHTML = eventListHTML.join('')

  const deleteEventButtonList = document.querySelectorAll('.event__button-delete')
  deleteEventButtonList.forEach((element) => {
    element.addEventListener('click', () => {
      eventList.remove(element.dataset.index)
      updateEventList()
    })
  })

  const detailEventButtonList = document.querySelectorAll('.event__button-detail')
  detailEventButtonList.forEach((element) => {
    element.addEventListener('click', () => {
      const eventDetail = element.parentElement.querySelector('.event__detail')
      eventDetail.classList.toggle('event__detail--show')
    })
  })
}

const initEventListDialog = () => {
  const dialogElement = document.getElementById('dialog-eventlist')
  const eventListDialog = new Dialog(dialogElement)

  const openDialogButton = document.getElementById('button-open-eventlist')
  openDialogButton.addEventListener('click', () => {
    updateEventList()
    eventListDialog.open()
  })
}
initEventListDialog()

const goodButton = document.getElementById('button-good')
goodButton.addEventListener('click', (event) => {
  const nowEvent = eventList.nowEvent()
  if(event.target.classList.contains('button--checked')) {
    nowEvent.goodCount--
    event.target.classList.remove('button--checked')
    return
  } else {
    nowEvent.goodCount++
    event.target.classList.add('button--checked')
  }
})

window.addEventListener('beforeunload', () => {
  eventList.save()
})
