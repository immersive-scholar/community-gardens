import React from "react";
import { Watch } from "scrollmonitor-react";

import { css } from "glamor";

import {
  wrapper,
  absoluteWrapper,
  placeholder,
  placeholder16x9,
  placeholder3x1,
  placeholder3x4,
  placeholder1x1,
  placeholderVis,
  placeholderLoaded,
  base,
  baseLoaded,
  hilite,
  hiliteLoaded,
} from "./styles";

class Reveal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageLoaded: 0, animated: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isInViewport && this.state.imageLoaded) {
      this.setState({ animated: true });
    }
  }

  render() {
    const { isInViewport, theme, ratio, reveal } = this.props;
    const ready = reveal && (isInViewport || this.state.animated);
    const baseColor = theme && theme.colors ? theme.colors.base : "#212121";

    const hiliteColor = theme && theme.colors ? theme.colors.pink : "#121212";

    return (
      <div {...css(wrapper)} {...css(absoluteWrapper)}>
        <div
          {...css(
            placeholder,
            ratio === "16x9" ? placeholder16x9 : {},
            ratio === "3x1" ? placeholder3x1 : ratio,
            ratio === "3x4" ? placeholder3x4 : ratio,
            ratio === "1x1" ? placeholder1x1 : ratio,
            ratio === "vis" ? placeholderVis : ratio,
            ready ? placeholderLoaded : {}
          )}
        />
        <div {...css(base, ready ? baseLoaded : {})}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            align="xMaxYMax"
            preserveAspectRatio="none"
          >
            <polygon points="100,0 100,100 0,100, 100,0" fill={baseColor} />
          </svg>
        </div>
        <div {...css(hilite, ready ? hiliteLoaded : {})}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            align="xMaxYMax"
            preserveAspectRatio="none"
          >
            <polygon points="100,0 0,100, 0,0 100,0" fill={hiliteColor} />
          </svg>
        </div>
      </div>
    );
  }
}
export default Watch(Reveal);
