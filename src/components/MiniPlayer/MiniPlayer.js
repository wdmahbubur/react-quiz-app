import React, { useRef, useState } from 'react';
import './MiniPlayer.css';
import ReactPlayer from 'react-player';

const MiniPlayer = ({ videoId, title }) => {
    const buttonRef = useRef();
    const [status, setStatus] = useState(false);

    const toggleMiniPlayer = () => {
        if (!status) {
            buttonRef.current.classList.remove("floatingBtn");
            setStatus(true);
        } else {
            buttonRef.current.classList.add("floatingBtn");
            setStatus(false);
        }
    }
    return (
        <div className="miniPlayer floatingBtn" ref={buttonRef} onClick={toggleMiniPlayer}>
            <span className="material-icons-outlined open"> play_circle_filled </span>
            <span className="material-icons-outlined close" onClick={toggleMiniPlayer}> close </span>
            <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoId}`}
                className="player"
                width="300px"
                height="168px"
                playing={status}
                controls
            />
            <p>{title}</p>
        </div>
    );
};

export default MiniPlayer;