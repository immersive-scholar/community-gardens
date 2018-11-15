import React, { PureComponent, Fragment } from "react";
import map from "lodash/map";
import { css } from "glamor";
import shuffle from "lodash/shuffle";

import { PlateText, Empty, Circle } from "pages/Presentation/styles";

class ColorSlide extends PureComponent {
  render() {
    const title = "Color";

    let colors = [
      "#cb94cd",
      "#a03968",
      "#c85c98",
      "#ec468a",
      "#c15085",
      "#7a475e",
      "#a87bb0",
      "#d17b79",
      "#fc5e37",
      "#fe6442",
      "#bf1229",
      "#552a39",
      "#ffc883",
      "#fe5735",
      "#fc8d45",
      "#ed7e28",
      "#db8531",
      "#bd9493"
    ];

    colors = shuffle(colors);

    return (
      <Fragment>
        <Empty />
        <Empty />
        <Empty />
        {map(title, (t, i) => {
          if (t === " ") return <Empty key={`circle-${i}`} />;
          return (
            <Circle
              key={`circle-${i}`}
              {...css({ background: `${colors[i]} !important` })}
            >
              <PlateText {...css({ color: `#ffffff !important` })}>
                {t.toUpperCase()}
              </PlateText>
            </Circle>
          );
        })}
      </Fragment>
    );
  }
}

export default ColorSlide;
