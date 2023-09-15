import { create, act } from 'react-test-renderer';
import FetchMock from 'fetch-mock';
import React from 'react';
import App from '../App';
import Video from '../Video';
import VideoList from '../VideoList';

beforeEach(() => {
  global.document.body.scrollIntoView = jest.fn();
  FetchMock.post(
    '/videos.json',
    JSON.stringify({
      filenames: [
        'Another Video.mkv',
        'Video_File.mp4',
      ],
    }),
  );
});

afterEach(() => {
  FetchMock.restore();
});

it('should render correctly', async () => {
  let root;
  await act(async () => new Promise((resolve) => {
    root = create(<App />);
    setTimeout(resolve, 500);
  }));

  expect(root.toJSON()).toMatchSnapshot();
  root.unmount();
});

describe('when a video is selected', () => {
  it('should load the new video', async () => {
    let subject;
    await act(async () => new Promise((resolve) => {
      subject = create(<App />);
      setTimeout(resolve, 500);
    }));

    const list = subject.root.findByType(VideoList);
    act(() => {
      list.props.onClick('new video.mp4');
    });

    const video = subject.root.findByType(Video);
    expect(video.props.src).toEqual('new video.mp4');
  });

  it('should scroll to the top of the body', async () => {
    let subject;
    await act(async () => new Promise((resolve) => {
      subject = create(<App />);
      setTimeout(resolve, 500);
    }));

    const list = subject.root.findByType(VideoList);
    act(() => {
      list.props.onClick('new video.mp4');
    });

    expect(global.document.body.scrollIntoView).toHaveBeenCalled();
  });
});
