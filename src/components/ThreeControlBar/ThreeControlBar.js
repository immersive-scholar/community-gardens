import React, { PureComponent } from "react";
import get from "lodash/get";
import { Link } from "react-router-dom";

import PlaybackControls from "./PlaybackControls";

import {
  wideContainer,
  removePaddingVertical,
  lightText,
  shadowless
} from "styles";
import { ControlBar, controlsGrid } from "./styles";

export default class ThreeControlBar extends PureComponent {
  onPlaybackChange = p => {
    this.props.setPlaying(p);
  };

  render() {
    const { playing } = this.props;
    const title = get(this.props, "selectedChapter.title", "Loading...");

    return (
      <ControlBar>
        <div
          {...wideContainer}
          {...removePaddingVertical}
          {...lightText}
          {...controlsGrid}
        >
          <PlaybackControls
            isPlaying={playing}
            onPlaybackChange={p => this.onPlaybackChange(p)}
          />
          {title}
          <Link {...shadowless} {...lightText} to="/">
            Exit
          </Link>
        </div>
      </ControlBar>
    );
  }
}
