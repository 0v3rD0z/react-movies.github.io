import React from "react";
import VideoListitem from "../components/VideoListItem";

const VideoList = (props) => {
  const {movieList} = props
  function receiveCallback(movie){
    props.callback(movie)
  }
  return (
    <div>
      <ul>
        {movieList.map(movie => {
          return <VideoListitem key={movie.id} movie={movie} callback={receiveCallback}/>;
        })}
      </ul>
    </div>
  );
};

export default VideoList;