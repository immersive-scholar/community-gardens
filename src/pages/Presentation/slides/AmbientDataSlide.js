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

class AmbientDataSlide extends PureComponent {
  render() {
    const title = "Ambient data";
    const { theme } = this.props;

    return (
      <Fragment>
        {map(title, (t, i) => {
          if (t === " ") return <Empty key={`circle-${i}`} />;
          return (
            <Circle
              key={`circle-${i}`}
              {...css({ color: `${theme.pink} !important` })}
            >
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

export default AmbientDataSlide;
