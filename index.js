/* eslint-disable no-console */
const path = require('path');
const config = require('./config.json');
const { createApp } = require('./server');

const app = createApp(
  path.join(__dirname, 'build'),
  config.videoDirectory || __dirname,
);

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
