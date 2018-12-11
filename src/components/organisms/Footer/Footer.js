import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { css } from "glamor";
import { TiSocialTwitter, TiSocialInstagram } from "react-icons/ti";

import Image from "components/atoms/Image";
import TextLink from "components/atoms/TextLink";

import {
  textContainer,
  removeMarginBottom,
  removePaddingTop,
  removePaddingBottom,
  shadowless,
  link,
  threeCols,
  twoColsSm,
  center
} from "styles";
import { Logo, links } from "./styles";

class Footer extends PureComponent {
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

    const year = new Date().getFullYear();

    this.setState({
      image,
      year
    });
  }
  render() {
    const { image, year } = this.state;
    const { theme } = this.props;

    return (
      <Fragment>
        <div
          {...css({
            display: "block",
            transition: "background 1s ease-out 0.5s",
            backgroundColor: theme.colors.bright
          })}
        >
          <div {...textContainer} {...threeCols} {...twoColsSm} {...links}>
            <TextLink
              {...css({ gridArea: "about" })}
              to="/about"
              label="About"
            />
            <TextLink
              {...css({ gridArea: "gardens" })}
              to="/gardens"
              label="Gardens"
            />
            <TextLink
              {...css({ gridArea: "credits" })}
              to="/credits"
              label="Credits"
            />
            <TextLink {...css({ gridArea: "data" })} to="/data" label="Data" />
            <TextLink
              {...css({ gridArea: "solutions" })}
              to="/solutions"
              label="Solutions"
            />
            <TextLink
              {...css({ gridArea: "contact" })}
              to="/contact"
              label="Contact"
            />
            <TextLink
              {...css({ gridArea: "tech" })}
              to="/tech"
              label="Technical Summary"
            />
            <TextLink
              {...css({ gridArea: "gallery" })}
              to="/gallery"
              label="Gallery"
            />
            <TextLink
              {...css({ display: "none" })}
              to="/garden/xmas-card"
              label="xmas 2018"
            />
            <TextLink
              {...css({ display: "none" })}
              to="/garden/petal-print"
              label="petal print"
            />
            <div {...css({ gridArea: "social" })}>
              <TextLink href="https://instagram.com/lucastswick">
                <TiSocialInstagram />
              </TextLink>{" "}
              <TextLink href="https://twitter.com/lucastswick">
                <TiSocialTwitter />
              </TextLink>
            </div>
          </div>
        </div>
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
        <div
          {...textContainer}
          {...center}
          {...removePaddingBottom}
          {...removePaddingTop}
          {...css({ color: "#ababab" })}
        >
          <p {...removeMarginBottom}>
            Copyright © {year} lucastswick. All rights reserved.
          </p>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ settings, theme }) => ({
  theme
});

export default connect(mapStateToProps)(Footer);
