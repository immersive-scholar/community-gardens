import React, { PureComponent } from "react";
import get from "lodash/get";

import PlaybackControls from "./PlaybackControls";

import { wideContainer, removePaddingVertical, lightText } from "styles";
import { ControlBar, controlsGrid } from "./styles";

export default class ThreeControlBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { playing: false };
  }

  onPlaybackChange = p => {
    this.setState({ playing: p });
  };
  render() {
    const { selectedChapterID, selectedChapter } = this.props;
    const { playing } = this.state;
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
          {/* <div>Settings</div> */}
        </div>
      </ControlBar>
    );
  }
}
