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

class GenerativeSlide extends PureComponent {
  render() {
    const title = "GENERATIVE";
    const { backgrounds, theme } = this.props;

    return (
      <Fragment>
        <Empty />
        {map(title, (t, i) => {
          let bg = backgrounds[i];
          return (
            <Circle key={`circle-${i}`}>
              <Background>
                <Image sources={bg} />
              </Background>
              <PlateText {...css({ color: theme.pink })}>
                {t.toUpperCase()}
              </PlateText>
            </Circle>
          );
        })}
      </Fragment>
    );
  }
}

export default GenerativeSlide;
