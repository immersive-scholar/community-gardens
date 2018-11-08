import React, { PureComponent, Fragment } from "react";
import map from "lodash/map";
import { css } from "glamor";

import Image from "components/atoms/Image";

import {
  PlateText,
  Empty,
  Circle,
  Background
} from "pages/Presentation/styles";

class MeSlide extends PureComponent {
  render() {
    const title = "lucastswick";
    const { theme } = this.props;

    return (
      <Fragment>
        <Empty />
        {map(title, (t, i) => {
          return (
            <Circle key={`circle-${i}`}>
              <PlateText {...css({ color: `${theme.bright} !important` })}>
                {t.toUpperCase()}
              </PlateText>
            </Circle>
          );
        })}
      </Fragment>
    );
  }
}

export default MeSlide;
