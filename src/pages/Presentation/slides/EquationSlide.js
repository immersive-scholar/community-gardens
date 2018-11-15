import React, { PureComponent, Fragment } from "react";
import map from "lodash/map";
import { css } from "glamor";

import { BodyText, Empty } from "pages/Presentation/styles";

class EquationSlide extends PureComponent {
  render() {
    const titles = ["input", "equation", "output"];
    const { theme } = this.props;

    return (
      <Fragment>
        <Empty />
        <Empty />
        <Empty />
        <Empty />
        <Empty />
        <Empty />
        {map(titles, (t, i) => {
          return (
            <BodyText
              key={`body_${i}`}
              {...css({ color: `${theme.bright} !important` })}
            >
              {t.toUpperCase()}
            </BodyText>
          );
        })}
      </Fragment>
    );
  }
}

export default EquationSlide;
