import React, { PureComponent } from "react";
import { css } from "glamor";

import typography from "util/typography";
import Animated from "components/molecules/Animated";
import Image from "components/atoms/Image";

import { textContainer, removePaddingBottom, removeMarginBottom } from "styles";
import { Logo } from "./styles";
class Footer extends PureComponent {
  componentWillMount() {
    // this.props.loadTheme();

    const theme = {
      bright: "#fbb3d1",
      pink: "#ec468a",
      dark: "#574f65",
      colors: ["#fbb3d1", "#ffffff", "#c25482"]
    };

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

    this.setState({
      theme,
      image
    });
  }
  render() {
    const { theme, image } = this.state;

    return (
      <div
        {...css({
          display: "block",
          transition: "background 1s ease-out 0.5s",
          backgroundColor: "#ffffff"
        })}
      >
        <div
          {...textContainer}
          {...css({
            display: "grid",
            gridTemplateColumns: "50% 50%",
            alignItems: "center"
          })}
        >
          <p {...removeMarginBottom}>
            This project was funded by the<br />Andrew W. Mellon Foundation.
          </p>
          <Logo>
            <Image ratio="3x1" sources={image} />
          </Logo>
        </div>
      </div>
    );
  }
}

export default Footer;
