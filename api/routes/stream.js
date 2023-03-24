const express = require('express');
const fs = require('fs');
const path = require('path');
const segments = require('../segments')

const router = express.Router();

const bearerToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    req.token = token;
    next();
  } else {
    res.sendStatus(401);
  }
};

let mediaSequence = 0;

// quitamos el primer segmento, agregamos uno nuevo al final e incrementamos la secuencia
function updateSegments() {
  const nextSegment = `segment${mediaSequence + 3}.ts`;
  const nextSegmentExists = fs.existsSync(path.join('../app/', 'videos', nextSegment));

  if (nextSegmentExists) {
    segments.shift();
    segments.push(nextSegment);
    mediaSequence++;
  } else {
    // si el siguiente segmento no existe, paramos de actualizar la variable segmento
    clearInterval(updateSegmentsInterval);
  }
}

// entragamos el archivo m3u8 con los primeros 3 segmentos
router.get('/m3u8', bearerToken, (req, res) => {
  const m3u8 = `#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-TARGETDURATION:10\n#EXT-X-MEDIA-SEQUENCE:${mediaSequence}\n`;
  const segmentsInfo = segments.slice(0, 3).map((segment) => `#EXTINF:10.000000,\n${segment}`).join('\n');
  res.header('Access-Control-Allow-Origin', '*');
  res.set('Content-Type', 'application/x-mpegURL');
  res.send(`${m3u8}${segmentsInfo}`);
});

// entrega el segmento requerido
router.get('/:segment', bearerToken, (req, res) => {
  const segment = req.params.segment;
  if (segments.includes(segment)) {
    res.header('Access-Control-Allow-Origin', '*');
    res.sendFile(segment, { root: `../app/videos` });
  } else {
    res.sendStatus(404);
  }
});

// intervalo de 10 segundos para actualizar los segmentos
const updateSegmentsInterval = setInterval(updateSegments, 10000);

module.exports = router;
