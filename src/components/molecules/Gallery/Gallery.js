import React, { PureComponent } from "react";
import { connect } from "react-redux";
import map from "lodash/map";

import Image from "components/atoms/Image";
import FillButton from "components/atoms/FillButton";
import DownloadButton from "components/atoms/FillButton/DownloadButton";

import { gallery, full, hs, item, wrapper, ButtonWrapper } from "./styles";
class Gallery extends PureComponent {
  renderPic = ({ pic, theme, index }) => {
    const downloadable = true;
    const purchasable = false;
    const lowResSource = [{ srcSet: pic[0].srcSet }];
    const highResSource = pic[pic.length - 1].srcSet;

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
          {purchasable && (
            <FillButton to="/purchase" label="Purchase" theme={theme} />
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
