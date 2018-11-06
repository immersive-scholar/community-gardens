import React from "react";

import PlaybackControls from "./PlaybackControls";

import {
  wideContainer,
  removePaddingVertical,
  lightText,
  shadowless,
  inlineBlock
} from "styles";
import { OptionsDiv } from "./styles";

const Options = ({ optionsOpen, isPlaying, onPlaybackChange }) => {
  return (
    <OptionsDiv {...wideContainer} {...removePaddingVertical} {...lightText}>
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
