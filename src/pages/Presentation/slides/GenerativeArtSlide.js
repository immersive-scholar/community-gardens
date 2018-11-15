import React, { PureComponent, Fragment } from "react";
import map from "lodash/map";
import { css } from "glamor";
import shuffle from "lodash/shuffle";

import Image from "components/atoms/Image";

import { Circle, Background } from "pages/Presentation/styles";

class GenerativeSlide extends PureComponent {
  componentWillMount() {
    const blomDark = [];
    let i;
    for (i = 1; i < 68; i++) {
      blomDark.push([
        {
          srcSet: require(`assets/backgrounds/blom-dark/blom-a-generative-art-series-by-lucastswick-sm-${i}.jpg`)
        }
      ]);
    }

    const blomLight = [];
    for (i = 70; i < 95; i++) {
      blomLight.push([
        {
          srcSet: require(`assets/backgrounds/blom-light/blom-a-generative-art-series-by-lucastswick-sm-${i}.jpg`)
        }
      ]);
    }

    this.setState({ backgrounds: shuffle(blomDark), blomDark, blomLight });
  }
  render() {
    let screens = new Array(12);
    const { backgrounds } = this.state;

    return (
      <Fragment>
        {map(screens, (screen, i) => {
          let bg = backgrounds[i];
          return (
            <Circle
              key={`circle-${i}`}
              {...css({ background: `#000000 !important` })}
            >
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

export default GenerativeSlide;
