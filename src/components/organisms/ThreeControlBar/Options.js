import React from "react";

import PlaybackControls from "./PlaybackControls";

import {
  removePaddingVertical,
  lightText,
  shadowless,
  inlineBlock
} from "styles";
import { OptionsDiv, container } from "./styles";

const Options = ({ optionsOpen, isPlaying, onPlaybackChange }) => {
  return (
    <OptionsDiv {...container} {...removePaddingVertical} {...lightText}>
      OPTIONS
      <PlaybackControls
        {...inlineBlock}
        isPlaying={isPlaying}
        onPlaybackChange={onPlaybackChange}
      />
    </OptionsDiv>
  );
};

export default Options;
