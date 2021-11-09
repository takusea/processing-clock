class AudioPlayer {
  constructor(element) {
    this.element = element
  }

  isPlaying() {
    return (!this.element.paused && !this.element.ended)
  }

  setFile(file) {
    if (this.isPlaying()) return

    const fileUrl = URL.createObjectURL(file)
    this.element.src = fileUrl
  }

  play() {
    if (this.isPlaying()) return
    this.element.play()
  }

  stop() {
    this.element.pause()
  }
}
