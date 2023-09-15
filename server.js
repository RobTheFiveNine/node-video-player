const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const config = require('./config.json');

const videoFileNamePattern = new RegExp(`(\\.${config.videoFileTypes.join('|\\.')})$`, 'i');

function createApp(appDirectory, videoDirectory) {
  const app = express();
  app.use(express.json());

  app.use('/videos', express.static(videoDirectory));
  app.use('/app', express.static(appDirectory));

  app.post('/videos.json', async (req, res) => {
    const dir = req.body.dir?.trim();
    const files = dir ? await fs.readdirSync(dir || videoDirectory) : [];
    const filenames = [];
    for (const file of files) {
      const stat = await fs.lstat(path.join(dir, file));
      if (stat.isDirectory() || videoFileNamePattern.test(path.extname(file).toLowerCase())) {
        filenames.push(file?.trim());
      }
    }
    res.header('Cache-Control', 'max-age=0, no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', 'Wed, 11 Jan 1984 05:00:00 GMT');
    res.send({ filenames });
  });

  return app;
}

module.exports = { createApp };
