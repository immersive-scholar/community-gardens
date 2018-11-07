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
  componentWillMount() {
    const backgroundFilenames = [
      "hr-1541474916803-2048x2048",
      "hr-1541474986837-2048x2048",
      "hr-1541475258969-2048x2048",
      "hr-1541475347108-2048x2048",
      "hr-1541475561202-2048x2048",
      "hr-1541475664041-2048x2048",
      "hr-1541476768539-2048x2048",
      "hr-1541477034736-2048x2048",
      "hr-1541478064355-2048x2048",
      "hr-1541478160164-2048x2048",
      "hr-1541478795951-2048x2048",
      "hr-1541519404405-2048x2048",
      "hr-1541519465781-2048x2048",
      "hr-1541526484189-2048x2048"
    ];

    const backgrounds = backgroundFilenames.map(filename => [
      {
        srcSet: require(`assets/backgrounds/community-gardens/${filename}.png`)
      }
    ]);

    this.setState({ backgrounds });
  }
  render() {
    let screens = new Array(12);

    let { theme } = this.props;
    let { backgrounds } = this.state;

    const sampledBackgrounds = sampleSize(backgrounds, 12);

    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

export default IntroSlide;
