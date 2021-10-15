import React from 'react';
import './Video.css';
const Video = ({ title, youtubeId, noq }) => {
  return (
    <div className="video">
      <img src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`} alt="" />
      <p>{title}</p>
      <div className="qmeta">
        <p>{noq} Questions</p>
        <p>Total Points : {noq * 5}</p>
      </div>
    </div>
  );
};

export default Video;