/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';

const Video = ({ src }) => {
  const extension = src.split('.').pop();
  return (
    <div className={`row video-container ${src !== '' ? 'visible' : ''}`}>
      <div className="col-md-12">
        <video autoPlay controls width="100%" key={src}>
          <source src={`/videos/${src}`} type={`video/${extension}`} />
        </video>
      </div>
    </div>
  );
};

Video.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Video;
