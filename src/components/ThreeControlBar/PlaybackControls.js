import React from "react";
import { Icon } from "react-icons-kit";
import { play2 } from "react-icons-kit/icomoon/play2";
import { pause } from "react-icons-kit/icomoon/pause";

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
      {...(!isPlaying ? lightText : lightFocusedText)}
      onClick={() => onPlaybackChange(true)}
    >
      Guided Tour
    </a>{" "}
    <i>or</i>{" "}
    <a
      {...shadowless}
      {...button}
      {...(isPlaying ? lightText : lightFocusedText)}
      onClick={() => onPlaybackChange(false)}
    >
      You drive
    </a>
  </div>
);

export default PlaybackControls;
