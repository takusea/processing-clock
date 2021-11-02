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

const getEventInfo = () => {
  const nowEvent = getNowEvent()
  if(nowEvent) {
    return ('現在の予定: ' + nowEvent.name + ' 👍' + nowEvent.goodCount)
  }

  const nextEvent = getNextEvent()
  if(nextEvent) {
    return ('次回の予定: ' + nextEvent.name + ' 👍' + nextEvent.goodCount)
  }

  return '予定はありません'
}

const updateEventInfo = () => {
  const eventInfoElement = document.getElementById('eventinfo')
  eventInfoElement.innerHTML = getEventInfo()

  const nowEvent = getNowEvent()
  if(nowEvent) {
    if(nowEvent.backgroundFile) {
      changeClockBackground(nowEvent.backgroundFile)
    }

    if(nowEvent.songFile) {
      playAudioFromFile(nowEvent.songFile)
    }
  }
  else {
    removeClockBackground()
    stopAudio()
  }
}

const initAddEventDialog = () => {
  const addEventDialog = new Dialog('dialog-addevent')

  const openDialogButton = document.getElementById('button-open-addevent')
  openDialogButton.addEventListener('click', () => {
    addEventDialog.open()
    initForm()
  })

  const cancelButton = document.getElementById('button-cancel')
  cancelButton.addEventListener('click', () => {
    addEventDialog.close()
  
    const menuForm = document.getElementById('form')
    menuForm.reset()
  })

  const submitButton = document.getElementById('button-submit')
  submitButton.addEventListener('click', () => {
    if(submitForm()) {
      addEventDialog.close()
    }
  })

  const resetButton = document.getElementById('button-reset')
  resetButton.addEventListener('click', () => {
    initForm()
  })  
}
initAddEventDialog()

const initEventListDialog = () => {
  const eventListDialog = new Dialog('dialog-eventlist')

  const openDialogButton = document.getElementById('button-open-eventlist')

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
  }

  openDialogButton.addEventListener('click', () => {
    eventListDialog.open()
  
    updateEventList()

    const deleteEventButtonList = document.querySelectorAll('.event__button-delete')
    deleteEventButtonList.forEach((element) => {
      element.addEventListener('click', () => {
        eventList.splice(element.dataset.index, 1)
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
  })

  const cancelButton = document.getElementById('eld-close')
  cancelButton.addEventListener('click', () => { eventListDialog.close() })
}
initEventListDialog()

const goodButton = document.getElementById('button-good')
goodButton.addEventListener('click', (event) => {
  const nowEvent = getNowEvent()
  if(event.target.classList.contains('button--checked')) {
    nowEvent.goodCount--
    event.target.classList.remove('button--checked')
    return
  }
  nowEvent.goodCount++
  event.target.classList.add('button--checked')
})

window.addEventListener('beforeunload', () => {
  localStorage.setItem('eventList', JSON.stringify(eventList))
})
