;(function () {
  let jsmpegPlayer
  const streamInput = document.getElementById('stream-url-input')
  const playBtn = document.getElementById('stream-play-btn')
  const videoContainer = document.getElementById('video-container')

  playBtn.onclick = () => {
    const streamUrl = streamInput.value
    fetch('http://127.0.0.1:3000/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ streamUrl }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (jsmpegPlayer) {
          jsmpegPlayer.stop()
          jsmpegPlayer.destroy()
        }

        const canvas = document.createElement('canvas')
        canvas.id = 'jsmpeg-player'
        videoContainer.appendChild(canvas)

        jsmpegPlayer = new JSMpeg.Player(data.url, {
          canvas,
          autoplay: true,
        })
      })
  }
})()
