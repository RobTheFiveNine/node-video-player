import React from 'react';
import classnames from 'classnames';
import Video from './Video';
import VideoList from './VideoList';
import css from './style.css';
import config from '../../config.json';

const App = () => {
  const homeDir = config.videoDirectory;
  const ignoreExt = config.ignoreExt;
  const [currentVideo, setCurrentVideo] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [allValues, setVideoList] = React.useState({
    currentDir: homeDir,
    videoList: [],
  });
  const videoFileNamePattern = new RegExp(`(\\.${config.videoFileTypes.join('|\\.')})$`, 'i');

  const fetchVideos = (cancelled = false, dir = allValues.currentDir) => {
    fetch(`/videos.json?dir=${dir}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dir,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (!cancelled) {
          setVideoList({
            currentDir: dir,
            videoList: r.filenames.filter((i) => {
              let ext = i.split('.');
              ext = ext[ext.length - 1];
              if (ignoreExt.indexOf(ext) === -1) return i;
            }),
          });
        }
      });
  };

  const onSearch = (e) => {
    const { value } = e.target;
    const matchRegex = new RegExp(value.split(' ').join('|'), 'i');
    setSearch(value);
    setVideoList({
      currentDir: allValues.currentDir,
      videoList: allValues.videoList.filter((i) => matchRegex.test(i)),
    });
    if (!value) {
      fetchVideos(false);
    }
  };

  const onClearSearchFilters = () => {
    setSearch('');
    fetchVideos(false);
  };

  const onCloseVideo = () => {
    setCurrentVideo('');
    fetchVideos(false);
  };

  const onVideoClick = React.useCallback((v) => {
    const video = `${allValues.currentDir}/${v}`;
    if (v.match(videoFileNamePattern)) {
      setCurrentVideo(video.replace(homeDir, '/videos'));
    } else {
      fetchVideos(false, video);
    }
  });

  const onBackClick = React.useCallback(() => {
    let dir = allValues.currentDir.split('/');
    delete dir[dir.length - 1];
    dir = dir.join('/').slice(0, -1);
    fetchVideos(false, dir);
  });

  React.useEffect(() => {
    let cancelled = false;
    fetchVideos(cancelled);
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
    <div className="container-fluid">
      { allValues.currentDir !== homeDir
        && (
          <div className="row">
            <div className="col-md-12 backRow mt-3">
              <div className="row">
                <button type="button" onClick={onBackClick} className="col-md-1 ml-4 backBtn btn btn-success btn-md text-center">
                  <i className="fa fa-arrow-left" aria-hidden="true" />
                </button>
                <div className="directoryFilters col-md-3">
                  <input type="text" className="form-control searchFilterInput" value={search} onChange={(e) => onSearch(e)} autoComplete="off" />
                  <i className="fa fa-times clearIcon" onClick={onClearSearchFilters} />
                </div>
              </div>
            </div>
          </div>
        )}
      <div className="row">
        <div className={classnames({
          'col-md-6': !!currentVideo,
          'col-md-12': !currentVideo
        })}>
          <VideoList
            onClick={onVideoClick}
            videos={allValues.videoList}
          />
        </div>
        {currentVideo && (
        <div className="col-md-6">
          <Video src={currentVideo} onCloseVideo={onCloseVideo} />
        </div>
        )}
      </div>
    </div>
  );
};

export default App;
