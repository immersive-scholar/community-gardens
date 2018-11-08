import React from "react";
import { Watch } from "scrollmonitor-react";
import LazyLoad from "react-lazyload";

import { css } from "glamor";
import { Picture } from "react-responsive-picture";

import {
  wrapper,
  placeholder,
  placeholder16x9,
  placeholder3x1,
  placeholderVis,
  placeholderLoaded,
  image,
  imageLoaded,
  base,
  baseLoaded,
  hilite,
  hiliteLoaded
} from "./styles";

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageLoaded: 0, animated: false };
  }

  handleImageLoaded() {
    this.setState({ imageLoaded: 1 });
  }

  handleImageErrored() {
    this.setState({ imageLoaded: -1 });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isInViewport && this.state.imageLoaded) {
      this.setState({ animated: true });
    }
  }

  render() {
    const { sources, isInViewport, theme, ratio } = this.props;
    const ready =
      (this.state.imageLoaded && isInViewport) || this.state.animated;
    const baseColor =
      theme && theme.colors && theme.colors.length
        ? theme.colors[0]
        : "#212121";

    const hiliteColor =
      theme && theme.colors && theme.colors.length
        ? theme.colors[1]
        : "#121212";

    var windowInnerHeight =
      window.innerHeight || document.documentElement.clientHeight;

    return (
      <div {...css(wrapper)}>
        <div
          {...css(
            placeholder,
            ratio === "16x9" ? placeholder16x9 : {},
            ratio === "3x1" ? placeholder3x1 : ratio,
            ratio === "vis" ? placeholderVis : ratio,
            ready ? placeholderLoaded : {}
          )}
        />
        <LazyLoad once offset={windowInnerHeight} height={1}>
          <Picture
            sources={sources}
            {...css(image, ready ? imageLoaded : {})}
            onLoad={() => this.handleImageLoaded()}
            onError={() => this.handleImageErrored()}
          />
        </LazyLoad>
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
export default Watch(Image);
