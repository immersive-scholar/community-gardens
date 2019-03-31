import React, { PureComponent } from "react";
import { css } from "glamor";
import map from "lodash/map";

import {
  Center,
  ColumnsGrid,
  RowCircle,
  H1,
  Background,
  blackBg,
} from "pages/Presentation/styles";

class TypographyTemplate extends PureComponent {
  render() {
    const { title } = this.state;
    const { theme } = this.props;

    return (
      <Center>
        <ColumnsGrid>
          {map(title, (t, i) => {
            return (
              <RowCircle key={`circle-${i}`}>
                <H1 {...css({ color: `${theme.bright} !important` })}>
                  {t.toUpperCase()}
                </H1>
              </RowCircle>
            );
          })}
        </ColumnsGrid>
      </Center>
    );
  }
}

export default TypographyTemplate;
