import React, { PureComponent } from "react";

import Gallery from "./Gallery";
import Animated from "components/molecules/Animated";

import { textContainer, removePaddingBottom, removePaddingTop } from "styles";

export default class GalleryTemplate extends PureComponent {
  render() {
    const { title, body, pictures, last = false } = this.props;

    return (
      <div
        {...textContainer}
        {...removePaddingTop}
        {...(last ? {} : removePaddingBottom)}
      >
        <Animated as="h2">{title}</Animated>
        <Animated>{body}</Animated>
        <Gallery pictures={pictures} />
      </div>
    );
  }
}
