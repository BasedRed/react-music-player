import React from "react";
// import { playAudio } from '../util';

const LibrarySong = ({
  currentSong,
  songs,
  setCurrentSong,
  id,
  audioRef,
  isPlaying,
  setSongs
}) => {
  const songSelectHandler = async () => {
    await setCurrentSong(currentSong);
    
    if (isPlaying) { audioRef.current.play() }

    // Here we add a thing that will highlight each song in a library that we choose
    const newSong = songs.map(song => {
      if (song.id === id) {
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

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${currentSong.active ? "selected" : ""}`}
    >
      <img alt={currentSong.name} src={currentSong.cover}></img>
      <div className="song-description">
        <h3>{currentSong.name}</h3>
        <h4>{currentSong.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
