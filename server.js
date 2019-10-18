const express = require('express')
const app = express()
const port = 3000
var path = require('path')
const getSubtitles = require('youtube-captions-scraper').getSubtitles;

function convert(value) {
  return(Math.floor(value / 60) + ":" + (value % 60 ? value % 60 : '00'))
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/video/:id/:busqueda', (req, res) => {
  let fil
  const id = req.params.id
  const busqueda = req.params.busqueda
  getSubtitles({
    videoID: id,
    lang: 'es'
  }).then(async function(captions) {
    fil = captions.filter(cap => cap.text.includes(busqueda))
    init = parseFloat(fil[0].start)
    end = parseFloat(fil[0].dur)
    fil[0].Timestamp = `${convert(init)}-${convert(init + end)}`
    await res.send(fil[0])
  });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
