const express = require('express');
const fs = require('fs-extra');
const config = require('./config.json');

const videoFileNamePattern = new RegExp(`(\\.${config.videoFileTypes.join('|\\.')})$`);

function createApp(appDirectory, videoDirectory) {
  const app = express();

  app.use('/videos', express.static(videoDirectory));
  app.use('/app', express.static(appDirectory));

  app.get('/videos.json', async (req, res) => {
    const files = await fs.readdir(videoDirectory);
    const videoFiles = files.filter((f) => f.match(videoFileNamePattern));

    res.header('Cache-Control', 'max-age=0, no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', 'Wed, 11 Jan 1984 05:00:00 GMT');

    res.send({ filenames: videoFiles });
  });

  return app;
}

module.exports = { createApp };
