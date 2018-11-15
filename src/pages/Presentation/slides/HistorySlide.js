import React, { PureComponent, Fragment } from "react";
import map from "lodash/map";
import { css } from "glamor";

import Image from "components/atoms/Image";

import {
  Empty,
  Circle,
  Background,
  Caption,
  Wrapper
} from "pages/Presentation/styles";

class HistorySlide extends PureComponent {
  componentWillMount() {
    const history = [];
    history.push([
      {
        srcSet: require(`assets/presentation/george-nees.jpg`)
      }
    ]);

    history.push([
      {
        srcSet: require(`assets/presentation/vera-molnar-1974.jpg`)
      }
    ]);

    history.push([
      {
        srcSet: require(`assets/presentation/john-maeda-1990.jpg`)
      }
    ]);

    const captions = [
      "George Nees, 1968",
      "Vera Molnar, 1974",
      "John Maeda, 1990"
    ];

    this.setState({ backgrounds: history, captions });
  }
  render() {
    let screens = new Array(3);
    const { backgrounds, captions } = this.state;

    return (
      <Fragment>
        <Empty />
        <Empty />
        <Empty />
        <Empty />
        <Empty />
        <Empty />
        {map(screens, (screen, i) => {
          let bg = backgrounds[i];
          return (
            <Wrapper key={`wrapper-${i}`}>
              <Circle {...css({ background: `#000000 !important` })}>
                <Background>
                  <Image sources={bg} />
                </Background>
              </Circle>
              <Caption>{captions[i]}</Caption>
            </Wrapper>
          );
        })}
      </Fragment>
    );
  }
}

export default HistorySlide;
