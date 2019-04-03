import React, { PureComponent } from "react";
import { css } from "glamor";
import { connect } from "react-redux";

import { removeMarginVertical, lightText } from "styles";
import {
  ShortMarqueeWrapper,
  TextWrapper,
  titleStyles,
  subtitleStyles,
} from "./styles";

class ShortMarquee extends PureComponent {
  render() {
    const { title, subtitle, theme } = this.props;
    const bg = theme.colors.pink2;

    return (
      <ShortMarqueeWrapper {...css({ backgroundColor: bg })}>
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
      </ShortMarqueeWrapper>
    );
  }
}

const mapStateToProps = ({ settings, theme }) => ({
  theme,
});

export default connect(mapStateToProps)(ShortMarquee);
