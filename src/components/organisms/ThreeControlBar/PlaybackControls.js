import React from "react";

import {
  inlineBlock,
  lightText,
  shadowless,
  lightFocusedText,
  button
} from "styles";

const PlaybackControls = ({ isPlaying, onPlaybackChange }) => (
  <div {...inlineBlock} {...lightText}>
    Choose Controls:{" "}
    <a
      {...shadowless}
      {...button}
      {...(isPlaying ? lightText : lightFocusedText)}
      onClick={() => onPlaybackChange(false)}
    >
      You drive
    </a>{" "}
    <i>or</i>{" "}
    <a
      {...shadowless}
      {...button}
      {...(!isPlaying ? lightText : lightFocusedText)}
      onClick={() => onPlaybackChange(true)}
    >
      Guided Tour
    </a>
  </div>
);

export default PlaybackControls;
