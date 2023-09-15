/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import config from '../../config.json';

const videoFileNamePattern = new RegExp(`(\\.${config.videoFileTypes.join('|\\.')})$`, 'i');
const getNowPlaying = (src) => {
  const srcArr = src.split('/');
  return srcArr[srcArr.length - 1].replace(videoFileNamePattern, '');
};

const Video = ({ src, onCloseVideo }) => {
  const extension = src.split('.').pop();
  return (
    <div className={`row video-container ${src !== '' ? 'visible' : ''}`}>
      <div className="col-md-12">
        <button type="button" onClick={onCloseVideo} className="closeVideoBtn btn btn-danger btn-md text-center">
          <i className="fa fa-times" />
        </button>
        <video autoPlay controls width="100%" key={src}>
          <source src={`${src}`} type={`video/${extension}`} />
        </video>
        <h3 className="nowPlayingTitle mt-2">
          Now playing:
          {' '}
          {getNowPlaying(src)}
        </h3>
      </div>
    </div>
  );
};

Video.propTypes = {
  src: PropTypes.string.isRequired,
  onCloseVideo: PropTypes.func.isRequired,
};

export default Video;
