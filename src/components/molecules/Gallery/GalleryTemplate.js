import React, { PureComponent } from "react";

import Gallery from "./Gallery";
import Animated from "components/molecules/Animated";

import { textContainer, removePaddingBottom } from "styles";

export default class GalleryTemplate extends PureComponent {
  render() {
    const { title, pictures, last = false } = this.props;

    return (
      <div {...textContainer} {...(last ? {} : removePaddingBottom)}>
        <Animated as="h2">{title}</Animated>
        <Gallery pictures={pictures} />
      </div>
    );
  }
}
