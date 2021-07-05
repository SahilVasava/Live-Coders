import React, { useCallback, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const useVideoJS = (videoJsOptions) => {
  const videoNode = React.useRef(null);
  const player = React.useRef(null);

  useEffect(() => {
    player.current = videojs(videoNode.current, videoJsOptions);
    return () => {
      player.current.dispose();
    };
  }, [videoJsOptions.changedKey]);

  const Video = useCallback(
    ({ children, ...props }) => {
      return (
        <div data-vjs-player key={videoJsOptions.changedKey}>
          <video ref={videoNode} className="video-js" {...props}>
            {children}
          </video>
        </div>
      );
    },
    [videoJsOptions.changedKey]
  );

  return { Video, player: player.current };
};
