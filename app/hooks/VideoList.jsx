import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import config from '../../config.json';

const videoFileNamePattern = new RegExp(`(\\.${config.videoFileTypes.join('|\\.')})$`, 'i');
const getFriendlyName = (fileName) => fileName.replace(videoFileNamePattern, '');

const VideoList = ({ videos, onClick }) => (
  <div className="row">
    {
        videos.map((v) => (
          <div className="col-md-2 gallery mt-3">
            <div
              key={v}
              tabIndex={0}
              role="link"
              className={classnames({
                directoryBox: !videoFileNamePattern.test(v),
                videoBox: videoFileNamePattern.test(v),
              })}
              onClick={() => onClick(v)}
              onKeyPress={() => onClick(v)}
            >
              {!videoFileNamePattern.test(v) && (
                <span className="folder">
                  <span className="file" />
                </span>
              )}
              {videoFileNamePattern.test(v) && (
                <span className="videoContainer">
                  <i className="fa fa-camera-retro fa-5x" style={{ color: '#fff' }} />
                </span>
              )}
              <div className="title">{getFriendlyName(v)}</div>
            </div>
          </div>
        ))
      }
  </div>
);

VideoList.propTypes = {
  onClick: PropTypes.func,
  videos: PropTypes.arrayOf(PropTypes.string).isRequired,
};

VideoList.defaultProps = {
  onClick: () => {},
};

export default VideoList;
