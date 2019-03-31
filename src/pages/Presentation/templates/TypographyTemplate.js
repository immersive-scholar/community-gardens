import React, { PureComponent } from "react";
import { css } from "glamor";
import map from "lodash/map";

import {
  Center,
  ColumnsGrid,
  RowCircle,
  ChapterTitle,
  H1,
  BodyText,
} from "pages/Presentation/styles";

class TypographyTemplate extends PureComponent {
  renderIndex = (index, theme) => {
    return (
      <ChapterTitle key={`index-${index}`}>
        <H1 {...css({ color: `${theme.bright} !important` })}>{index}</H1>
      </ChapterTitle>
    );
  };
  render() {
    const { title, titles, index } = this.state;
    const { theme } = this.props;

    if (titles) {
      return (
        <Center>
          {index && this.renderIndex(index, theme)}

          <ColumnsGrid>
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
          </ColumnsGrid>
        </Center>
      );
    }

    return (
      <Center>
        {index && this.renderIndex(index, theme)}

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
