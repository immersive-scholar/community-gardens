import React, { PureComponent, Fragment } from "react";
import map from "lodash/map";
import sampleSize from "lodash/sampleSize";

import Image from "components/atoms/Image";

import {
  Center,
  PageWrapper,
  Circle,
  Background,
  blackBg,
} from "pages/Presentation/styles";

class ImageTransitionSlide extends PureComponent {
  render() {
    let screens = new Array(12);

    let { backgrounds } = this.state;

    const sampledBackgrounds = sampleSize(backgrounds, 12);

    return (
      <Center>
        <PageWrapper>
          {map(screens, (screen, i) => {
            let bg = sampledBackgrounds[i];
            return (
              <Circle key={`circle-${i}`} {...blackBg}>
                <Background>
                  <Image sources={bg} />
                </Background>
              </Circle>
            );
          })}
        </PageWrapper>
      </Center>
    );
  }
}

export default ImageTransitionSlide;
