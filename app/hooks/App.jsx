import React from 'react';
import Video from './Video';
import VideoList from './VideoList';

const App = () => {
  const [currentVideo, setCurrentVideo] = React.useState('');
  const [videoList, setVideoList] = React.useState([]);

  const onVideoClick = React.useCallback((v) => {
    setCurrentVideo(v);
  });

  React.useEffect(() => {
    let cancelled = false;

    fetch('/videos.json')
      .then((r) => r.json())
      .then((r) => {
        if (!cancelled) {
          setVideoList(r.filenames);
        }
      });

    return () => { cancelled = true; };
  }, []);

  React.useEffect(() => {
    if (currentVideo !== '') {
      const body = document.querySelector('body');

      body.scrollIntoView({
        behavior: 'smooth',
      }, 500);
    }
  }, [currentVideo]);

  return (
    <div>
      <Video src={currentVideo} />
      <VideoList
        onClick={onVideoClick}
        videos={videoList}
      />
    </div>
  );
};

export default App;
