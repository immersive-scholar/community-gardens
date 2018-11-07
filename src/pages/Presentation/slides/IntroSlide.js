import React, { PureComponent, Fragment } from "react";
import map from "lodash/map";
import { css } from "glamor";
import sampleSize from "lodash/sampleSize";
import range from "lodash/range";
import toArray from "lodash/toArray";

import Image from "components/atoms/Image";

import {
  PlateText,
  Empty,
  Circle,
  Background,
  blackBg
} from "pages/Presentation/styles";

class IntroSlide extends PureComponent {
  render() {
    let slides = new Array(12);

    let { backgrounds, theme } = this.props;

    const sampledBackgrounds = sampleSize(backgrounds, 12);

    return (
      <Fragment>
        {map(slides, (slide, i) => {
          let bg = sampledBackgrounds[i];
          return (
            <Circle key={`circle-${i}`} {...blackBg}>
              <Background>
                <Image sources={bg} />
              </Background>
            </Circle>
          );
        })}
      </Fragment>
    );
  }
}

export default IntroSlide;
