import React, { PureComponent } from "react";

import Image from "components/atoms/Image";

import { removeMarginBottom } from "styles";
import { LogoWrapperDiv, Logo } from "./styles";

class ImmersiveScholarLogo extends PureComponent {
  componentWillMount() {
    const image = [
      {
        srcSet: require(`assets/logos/immersive-scholar-logo-sm.png`),
        media: "(max-width: 720px)"
      },
      {
        srcSet: require(`assets/logos/immersive-scholar-logo.png`),
        media: "(max-width: 1400px)"
      },
      {
        srcSet: require(`assets/logos/immersive-scholar-logo-xl.png`)
      }
    ];
    this.setState({ image });
  }
  render() {
    const { image } = this.state;

    return (
      <LogoWrapperDiv>
        <p {...removeMarginBottom}>
          This project was funded by the Andrew W. Mellon Foundation.
        </p>
        <Logo>
          <Image ratio="3x1" sources={image} />
        </Logo>
      </LogoWrapperDiv>
    );
  }
}

export default ImmersiveScholarLogo;
