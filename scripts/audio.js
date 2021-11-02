const playAudioFromFile = (sourceFile) => {
    const audioElement = document.getElementById('audio')
    if(!audioElement.paused && !audioElement.ended) return
    const fileUrl = URL.createObjectURL(sourceFile)
    audioElement.src = fileUrl
    audioElement.play()
  }
  
  const stopAudio = () => {
    const audioElement = document.getElementById('audio')
    audioElement.pause()
  }
  