import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { css } from "glamor";
import typography from "util/typography";
import map from "lodash/map";

import Image from "components/atoms/Image";
import FillButton from "components/atoms/FillButton";
import DownloadButton from "components/atoms/FillButton/DownloadButton";

import { gallery, full, hs, item, wrapper, ButtonWrapper } from "./styles";

class Gallery extends PureComponent {
  renderPic = ({ pic, theme, index }) => {
    const downloadable = true;
    const purchasable = pic.shopifyLink;
    const lowResSource = [{ srcSet: pic.url[0].srcSet }];
    const highResSource = pic.url[pic.url.length - 1].srcSet;
    const shopifyLink = pic.shopifyLink;

    return (
      <div {...item} key={`pic_${index}`}>
        <Image ratio="1x1" sources={lowResSource} theme={theme} />
        <ButtonWrapper>
          {downloadable && (
            <DownloadButton
              path={highResSource}
              label="Download"
              theme={theme}
            />
          )}
          {purchasable ? (
            <FillButton href={shopifyLink} label="Purchase" theme={theme} />
          ) : (
            <p
              {...css({
                whiteSpace: "nowrap",
                padding: `${typography.rhythm(0.5)} ${typography.rhythm(1)}`,
                lineHeight: typography.rhythm(1.5),
                margin: 0,
                background: "#cecece",
              })}
            >
              Unavailable
            </p>
          )}
        </ButtonWrapper>
      </div>
    );
  };
  render() {
    const { pictures, theme } = this.props;

    return (
      <div {...gallery}>
        <div {...wrapper} {...hs} {...full}>
          {map(pictures, (pic, index) => this.renderPic({ pic, theme, index }))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ theme }) => {
  return {
    theme,
  };
};

export default connect(mapStateToProps)(Gallery);
