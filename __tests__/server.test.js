const path = require('path');
const request = require('supertest');
const { createApp } = require('../server');

const app = createApp(
  path.join(__dirname, '..', '__sandbox__', 'build'),
  path.join(__dirname, '..', '__sandbox__'),
);
let agent;

beforeEach(() => {
  agent = request.agent(app);
});

describe('POST /videos.json', () => {
  it('should flag to the browser to not cache the file', async () => {
    const response = await agent.post('/videos.json');
    expect(response.status).toBe(200);
    expect(response.headers['cache-control']).toEqual('max-age=0, no-cache, no-store, must-revalidate');
    expect(response.headers.pragma).toEqual('no-cache');
    expect(response.headers.expires).toEqual('Wed, 11 Jan 1984 05:00:00 GMT');
  });

  it('should include the file names of the videos in the current working directory', async () => {
    const response = await agent.post('/videos.json');
    expect(response.status).toBe(200);
    expect(response.body.filenames).toEqual(['Another Video.webm', 'Video_File.Webm', 'Video_File.mp4']);
  });
});

describe('GET /videos/:name', () => {
  it('should serve the video files', async () => {
    const response = await agent.get('/videos/Video_File.mp4');
    expect(response.status).toBe(200);
    expect(response.body.toString()).toEqual('Video_File.mp4 content');
  });
});

describe('GET /app/', () => {
  it('should serve the `build` directories index file', async () => {
    const response = await agent.get('/app/');
    expect(response.status).toBe(200);
    expect(response.text).toEqual('build double');
  });
});

describe('GET /app/:filename', () => {
  it('should serve the file from the `build` directory', async () => {
    const response = await agent.get('/app/bundle.js');
    expect(response.status).toBe(200);
    expect(response.text).toEqual('/* dummy bundle */');
  });
});
