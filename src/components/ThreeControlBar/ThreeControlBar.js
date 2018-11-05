import React, { PureComponent } from "react";
import get from "lodash/get";

import { wideContainer, removePaddingVertical, lightText } from "styles";
import { ControlBar } from "./styles";

export default class ThreeControlBar extends PureComponent {
  render() {
    const { selectedChapterID, selectedChapter } = this.props;
    const title = get(this.props, "selectedChapter.title", "Loading...");

    return (
      <ControlBar>
        <div {...wideContainer} {...removePaddingVertical} {...lightText}>
          {title}
        </div>
      </ControlBar>
    );
  }
}
