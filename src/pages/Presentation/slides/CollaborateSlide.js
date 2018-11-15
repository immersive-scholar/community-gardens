import React, { PureComponent, Fragment } from "react";
import map from "lodash/map";
import { css } from "glamor";

import { PlateText, Empty, Circle } from "pages/Presentation/styles";

class CollaborateSlide extends PureComponent {
  render() {
    const title = "Collaborate";
    const { theme } = this.props;

    return (
      <Fragment>
        <Empty />
        {map(title, (t, i) => {
          return (
            <Circle
              key={`circle-${i}`}
              {...css({ color: `${theme.pink} !important` })}
            >
              <PlateText {...css({ color: `${theme.bright} !important` })}>
                {t.toUpperCase()}
              </PlateText>
            </Circle>
          );
        })}
      </Fragment>
    );
  }
}

export default CollaborateSlide;
