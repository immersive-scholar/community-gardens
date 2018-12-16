import React, { PureComponent } from "react";
import { connect } from "react-redux";

import Image from "components/atoms/Image";

import { removeMarginVertical, lightText } from "styles";
import {
  MarqueeWrapper,
  TextWrapper,
  Darken,
  titleStyles,
  subtitleStyles
} from "./styles";

class Marquee extends PureComponent {
  render() {
    const { image, title, subtitle, theme } = this.props;
    return (
      <MarqueeWrapper>
        <Image ratio="16x9" sources={image} theme={theme} />
        <Darken />
        <TextWrapper>
          <div>
            {title && (
              <h1 {...removeMarginVertical} {...lightText} {...titleStyles}>
                {title}
              </h1>
            )}
            {subtitle && (
              <h2 {...lightText} {...subtitleStyles}>
                {subtitle}
              </h2>
            )}
          </div>
        </TextWrapper>
      </MarqueeWrapper>
    );
  }
}

const mapStateToProps = ({ settings, theme }) => ({
  theme
});

export default connect(mapStateToProps)(Marquee);
