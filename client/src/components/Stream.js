import React from "react";
import videojs from "video.js";
import { useVideoJS } from "../hooks/useVideojs";

const Stream = () => {
  const { Video } = useVideoJS({
    sources: [
      {
        src: "http://localhost:8000/live/st5FoZJUToISjQifslPqt/index.m3u8",
        type: "application/x-mpegURL",
      },
    ],
    controls: true,
    playbackRates: [0.5, 1, 1.5, 2],
    responsive: true,
    fluid: true,
  });
  return (
    <div className="section">
      <div className="container">
        <div className="columns is-multiline">
          <div className="column">
            <Video />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stream;
