import React from 'react';
import PropTypes from 'prop-types';

const getFriendlyName = (fileName) => {
  const parts = fileName.split('.');
  parts.splice(-1, 1);

  return parts.join(' ').replace('_', ' ');
};

const VideoList = ({ videos, onClick }) => (
  <div className="row">
    {
        videos.map((v) => (
          <div
            key={v}
            tabIndex={0}
            role="link"
            className="col-md-3 cursor-pointer text-center"
            onClick={() => onClick(v)}
            onKeyPress={() => onClick(v)}
          >
            <img
              alt={getFriendlyName(v)}
              src={`/videos/${v}.jpg`}
              className="thumbnail"
            />
            {getFriendlyName(v)}
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
