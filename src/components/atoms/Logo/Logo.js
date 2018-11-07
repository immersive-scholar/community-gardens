import React, { PureComponent } from "react";
import Image from "components/atoms/Image";

import { LogoDiv } from "./styles";

class Logo extends PureComponent {
  componentWillMount() {
    const image = [
      {
        srcSet: require(`assets/logos/community-gardens-logo.png`)
      }
    ];
    this.setState({ image });
  }
  render() {
    const { image } = this.state;

    return (
      <LogoDiv>
        <Image sources={image} />
      </LogoDiv>
    );
  }
}

export default Logo;
