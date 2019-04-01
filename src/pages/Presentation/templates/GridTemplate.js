import React, { PureComponent } from "react";
import map from "lodash/map";

import Image from "components/atoms/Image";

import {
  Center,
  PageWrapper,
  Circle,
  Background,
  blackBg,
  Caption,
} from "pages/Presentation/styles";

class GridTemplate extends PureComponent {
  render() {
    let { backgrounds, captions } = this.state;

    return (
      <Center>
        <PageWrapper>
          {map(backgrounds, (background, i) => {
            let caption = captions[i];
            return (
              <Circle key={`circle-${i}`} {...blackBg}>
                <Background>
                  <Image sources={background} />
                </Background>
                {caption && <Caption>{captions[i]}</Caption>}
              </Circle>
            );
          })}
        </PageWrapper>
      </Center>
    );
  }
}

export default GridTemplate;
