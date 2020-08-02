import { create, act } from 'react-test-renderer';
import React from 'react';
import VideoList from '../VideoList';

const createSubject = () => {
  let subject;
  const onClick = jest.fn();

  act(() => {
    subject = create(
      <VideoList onClick={onClick} videos={['file1.mp4', 'file2.mp4', 'file3.mp4']} />,
    );
  });

  return { subject, onClick };
};

it('should render correctly', () => {
  const { subject } = createSubject();
  expect(subject.toJSON()).toMatchSnapshot();
});

describe('when a video is clicked', () => {
  it('should invoke `props.onClick` with the video name', () => {
    const { subject, onClick } = createSubject();
    const videos = subject.root.findAllByProps({ role: 'link' });

    videos[0].props.onClick();
    expect(onClick).toHaveBeenCalledWith('file1.mp4');
  });
});

describe('when a video receives a key press', () => {
  it('should invoke `props.onClick` with the video name', () => {
    const { subject, onClick } = createSubject();
    const videos = subject.root.findAllByProps({ role: 'link' });

    videos[0].props.onKeyPress();
    expect(onClick).toHaveBeenCalledWith('file1.mp4');
  });
});