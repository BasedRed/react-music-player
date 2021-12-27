import React from "react";
import {
  FortAwesomeIcon,
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause
} from "@fortawesome/free-solid-svg-icons";

// import { playAudio } from "../util";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setCurrentSong,
  setSongs
}) => {
  
  

  //Handlers or so called functions
  //Handler that stops or plays <audio> tag using reference and buton click
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  //Just a handler that converts timeformat to minutes/seconds
  const getTime = time => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  //Handler that lets us drag the slider
  const dragHandler = e => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipSongHandler = async direction => {
    let songIndex = songs.findIndex(song => song.id === currentSong.id);
    // direction == 'skip-back' ? songIndex -=1 : songIndex += 1;
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(songIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(songIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((songIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        if (isPlaying) {
          audioRef.current.play();
        }
        return;
      }

      await setCurrentSong(songs[(songIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(songIndex - 1) % songs.length]);
    }
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const activeLibraryHandler = prevNext => {
    const newSong = songs.map(song => {
      if (song.id === prevNext.id) {
        return {
          ...song,
          active: true
        };
      } else {
        return {
          ...song,
          active: false
        };
      }
    });

    setSongs(newSong);
  };

  //---------- List of states goes below --------------
  //State

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`
  };

  // And here's the return fucntion returning the piece of HTML code
  return (
    <div className="player-container">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`
          }}
          className="track"
        >
          <input
            onChange={dragHandler}
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipSongHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />

        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />

        {/* <FontAwesomeIcon className="pause" size="2x" icon={faPause} /> */}

        <FontAwesomeIcon
          onClick={() => skipSongHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
