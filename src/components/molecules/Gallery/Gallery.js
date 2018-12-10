import React, { PureComponent } from "react";
import { connect } from "react-redux";
import map from "lodash/map";

import Image from "components/atoms/Image";
import FillButton from "components/atoms/FillButton";

import { gallery, full, hs, item, wrapper } from "./styles";
class Gallery extends PureComponent {
  render() {
    const { pictures, theme } = this.props;

    return (
      <div {...gallery}>
        <div {...wrapper} {...hs} {...full}>
          {map(pictures, (pic, index) => (
            <div {...item} key={`pic_${index}`}>
              <Image ratio="1x1" sources={pic} theme={theme} />
              {pic.downloadable && (
                <FillButton to="/data" label="Download" theme={theme} />
              )}
              {pic.purchasable && (
                <FillButton to="/purchase" label="Purchase" theme={theme} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ theme }) => {
  return {
    theme
  };
};

export default connect(mapStateToProps)(Gallery);
