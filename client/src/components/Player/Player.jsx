import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import './Player.css';
import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_HOST;


const Player = () => {
  const videoRef = useRef(null);
  const [showPlayButton, setShowPlayButton] = useState(true);

  const handleVideoClick = () => {
    const video = videoRef.current;
  
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };
  

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('click', handleVideoClick);
    }
  
    return () => {
      if (videoRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        videoRef.current.removeEventListener('click', handleVideoClick);
      }
    };
  }, []);


  useEffect(() => {
    let hls;
    const video = videoRef.current;

    if (Hls.isSupported()) {
      hls = new Hls({
        xhrSetup: (xhr, url) => {
          xhr.setRequestHeader('Authorization', `Bearer ${axios.defaults.headers.common.Authorization.split(' ')[1]}`);
        },
      });
      hls.loadSource(`${baseUrl}/stream/m3u8`);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = `${baseUrl}/stream/m3u8`;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h2>Player</h2>
      </div>
      <div className="card-body">
        <div className="video-container" onClick={() => setShowPlayButton(!showPlayButton)}>
          <video ref={videoRef} className="video-js vjs-default-skin" playsInline></video>
        </div>
      </div>
    </div>
  );
};

export default Player;
