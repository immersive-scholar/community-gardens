import React from "react";
import { Icon } from "react-icons-kit";
import { play2 } from "react-icons-kit/icomoon/play2";
import { pause } from "react-icons-kit/icomoon/pause";

const PlaybackControls = ({ isPlaying, onPlaybackChange }) => (
  <div
    onClick={() => onPlaybackChange(!isPlaying)}
    style={{ color: "#ffffff", display: "inlineBlock" }}
  >
    {!isPlaying ? (
      <Icon size={24} icon={pause} />
    ) : (
      <Icon size={24} icon={play2} />
    )}
  </div>
);

export default PlaybackControls;
