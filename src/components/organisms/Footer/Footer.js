import React, { PureComponent } from "react";
import { css } from "glamor";

import Image from "components/atoms/Image";

import { textContainer, removeMarginBottom, shadowless, link } from "styles";
import { Logo } from "./styles";
import TextLink from "../../atoms/TextLink/TextLink";
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
    const { image } = this.state;

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
            This project was funded by the<br />
            <TextLink
              href="https://www.immersivescholar.org/"
              label="Andrew W. Mellon Foundation"
            />.
          </p>
          <a
            {...shadowless}
            {...link}
            target="_blank"
            rel="nofollow noopener noreferrer"
            href="https://www.immersivescholar.org/"
          >
            <Logo>
              <Image ratio="3x1" sources={image} />
            </Logo>
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
