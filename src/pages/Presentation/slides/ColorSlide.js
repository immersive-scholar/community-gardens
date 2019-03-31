import React, { PureComponent } from "react";
import map from "lodash/map";
import { css } from "glamor";
import sampleSize from "lodash/sampleSize";

import { Center, ColumnsGrid, H1, RowCircle } from "pages/Presentation/styles";

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
      "#bd9493",
    ];

    colors = sampleSize(colors, 5);

    return (
      <Center>
        <ColumnsGrid>
          {map(colors, (color, i) => {
            return (
              <RowCircle
                key={`circle-${i}`}
                {...css({ background: `${colors[i]} !important` })}
              >
                <H1 {...css({ color: "#fff !important" })}>
                  {title.charAt(i).toUpperCase()}
                </H1>
              </RowCircle>
            );
          })}
        </ColumnsGrid>
      </Center>
    );
  }
}

export default ColorSlide;
