const eventList = JSON.parse(localStorage.getItem('eventList')) || []

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
