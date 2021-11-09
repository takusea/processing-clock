class EventList {
  constructor() {
    this.list = []
    this.load()
  }

  load() {
    const listString = localStorage.getItem('eventList')
    this.list = JSON.parse(listString) || []
  }

  save() {
    localStorage.setItem('eventList', JSON.stringify(this.list))
  }

  sort() {
    this.list.sort((a, b) => {
      const aDate = new Date(` ${a.startdate} ${a.starttime}`)
      const bDate = new Date(` ${b.startdate} ${b.starttime}`)
      if (aDate < bDate) return -1
      if (bDate < aDate) return 1
      return 0
    })
  }

  map(callback) {
    return this.list.map(callback)
  }

  push(event) {
    this.list.push(event)
    this.sort()
  }

  remove(index) {
    this.list.splice(index, 1)
  }

  nowEvent() {
    return this.list.find((event) => {
      const nowDate = new Date()
      const eventStartDate = new Date(` ${event.startdate} ${event.starttime}`)
      const eventFinishDate = new Date(` ${event.finishdate} ${event.finishtime}`)
      return eventStartDate <= nowDate && eventFinishDate > nowDate
    })
  }

  nextEvent() {
    return this.list.find((event) => {
      const nowDate = new Date()
      const eventFinishDate = new Date(` ${event.finishdate} ${event.finishtime}`)
      return eventFinishDate > nowDate
    })
  }

  toDisplayText() {
    const nowEvent = this.nowEvent()
    if (nowEvent) {
      return ('現在の予定: ' + nowEvent.name + ' 👍' + nowEvent.goodCount)
    }

    const nextEvent = this.nowEvent()
    if (nextEvent) {
      return ('次回の予定: ' + nextEvent.name + ' 👍' + nextEvent.goodCount)
    }

    return '予定はありません'
  }
}