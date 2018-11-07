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
  componentWillMount() {
    const blomDark = [];
    for (var i = 1; i < 68; i++) {
      blomDark.push([
        {
          srcSet: require(`assets/backgrounds/blom-dark/blom-a-generative-art-series-by-lucastswick-sm-${i}.jpg`)
        }
      ]);
    }

    const blomLight = [];
    for (var i = 70; i < 95; i++) {
      blomLight.push([
        {
          srcSet: require(`assets/backgrounds/blom-light/blom-a-generative-art-series-by-lucastswick-sm-${i}.jpg`)
        }
      ]);
    }

    this.setState({ backgrounds: blomLight, blomDark, blomLight });
  }
  render() {
    const title = "GENERATIVE";
    const { theme } = this.props;
    const { backgrounds } = this.state;

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
              <PlateText {...css({ color: theme.dark })}>
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
