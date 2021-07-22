const express = require('express')
const cors = require('cors')
const Stream = require('node-rtsp-stream')

const app = express()

app.use(cors())
app.use(express.json())

const port = 3000
const wsPort = 9999

let stream = null

app.post('/start', function (req, res) {
  if (stream !== null) {
    stream.stop()
    stream = null
  }

  console.log(req.body)
  const { streamUrl } = req.body

  try {
    stream = new Stream({
      name: 'videoStream',
      streamUrl: streamUrl,
      wsPort: wsPort,
      ffmpegOptions: {
        '-stats': '',
        '-r': 30,
      },
    })
    res.json({ url: `ws://127.0.0.1:${wsPort}` })
  } catch (e) {
    console.error(e)
  }
})

app.listen(port, () => {
  console.log(`server listening commands at http://127.0.0.1:${port}`)
})
