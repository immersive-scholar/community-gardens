import React, { PureComponent } from "react";
import map from "lodash/map";

import Image from "components/atoms/Image";

import { gallery, full, hs, item, wrapper } from "./styles";

export default class Gallery extends PureComponent {
  render() {
    const { pictures } = this.props;
    return (
      <div {...gallery}>
        <div {...wrapper} {...hs} {...full}>
          {map(pictures, (pic, index) => (
            <div {...item} key={`pic_${index}`}>
              <Image ratio="1x1" sources={pic} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
