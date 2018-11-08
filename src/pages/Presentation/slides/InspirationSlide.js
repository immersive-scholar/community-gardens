import React, { PureComponent, Fragment } from "react";
import map from "lodash/map";
import { css } from "glamor";
import shuffle from "lodash/shuffle";

import Image from "components/atoms/Image";

import {
  PlateText,
  Empty,
  Circle,
  Background,
  Caption,
  Wrapper
} from "pages/Presentation/styles";
import { Em } from "glamorous";

class InspirationSlide extends PureComponent {
  componentWillMount() {
    const history = [];
    for (var i = 1; i <= 3; i++) {
      history.push([
        {
          srcSet: require(`assets/presentation/jared-tarbell-${i}.jpg`)
        }
      ]);
    }
    for (var i = 1; i <= 3; i++) {
      history.push([
        {
          srcSet: require(`assets/presentation/inconvergent-${i}.jpg`)
        }
      ]);
    }
    for (var i = 1; i <= 3; i++) {
      history.push([
        {
          srcSet: require(`assets/presentation/flight404-${i}.jpg`)
        }
      ]);
    }
    for (var i = 1; i <= 3; i++) {
      history.push([
        {
          srcSet: require(`assets/presentation/nervous-${i}.jpg`)
        }
      ]);
    }

    const captions = [
      "Jared Tarbell",
      "Anders Hoff",
      "Robert Hodgin",
      "n-e-r-v-o-u-s"
    ];

    this.setState({ backgrounds: history, captions });
  }
  render() {
    let screens = new Array(12);
    const { theme } = this.props;
    const { backgrounds, captions } = this.state;

    return (
      <Fragment>
        {map(screens, (screen, i) => {
          let bg = backgrounds[i];
          return (
            <Wrapper key={`wrapper-${i}`}>
              <Circle {...css({ background: `#000000 !important` })}>
                <Background>
                  <Image sources={bg} />
                </Background>
              </Circle>
              {i % 3 === 1 && <Caption>{captions[(i - 1) / 3]}</Caption>}
            </Wrapper>
          );
        })}
      </Fragment>
    );
  }
}

export default InspirationSlide;
