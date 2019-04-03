import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { TiSocialTwitter, TiSocialInstagram } from "react-icons/ti";
import Obfuscate from "react-obfuscate";

import TextLink from "components/atoms/TextLink";
import Marquee from "components/molecules/Marquee";
import Animated from "components/molecules/Animated";
import Newsletter from "components/organisms/Newsletter";
import Footer from "components/organisms/Footer";
import PathToPicture from "util/PathToPicture";
import profilePic from "assets/lucastswick-avatar.jpg";
import WebbyBanner from "components/atoms/FillButton/WebbyBanner";

import {
  textContainer,
  wideContainer,
  threeCols,
  center,
  CircleMaskDiv,
} from "styles";
import { css } from "glamor";

class Contact extends PureComponent {
  componentWillMount() {
    const headerImage = PathToPicture("headers", `presentation`);
    this.setState({ headerImage });
  }

  render() {
    const { headerImage } = this.state;
    const { theme } = this.props;

    return (
      <div>
        <Helmet
          title="About Community Gardens"
          description="Contact generative artist lucastswick"
        />
        <WebbyBanner />
        <Marquee image={headerImage} />
        <div {...textContainer}>
          <Animated as="h1">Contact</Animated>
          <Animated>
            If you live in Portland, I'm always down to grab a coffee! DM me on{" "}
            <TextLink href="https://twitter.com/lucastswick" label="Twitter" />{" "}
            or{" "}
            <TextLink
              href="https://instagram.com/lucastswick"
              label="Instagram"
            />{" "}
            and we'll make it happen.
          </Animated>
        </div>
        <div {...wideContainer}>
          <div {...threeCols} {...center}>
            <Animated as="span">
              <TextLink href="https://instagram.com/lucastswick">
                <TiSocialInstagram size={"8rem"} color={theme.colors.pink} />
              </TextLink>
            </Animated>
            <Animated as="span">
              <CircleMaskDiv {...css({ lineHeight: 0 })}>
                <img
                  src={profilePic}
                  alt={`Lucas Swick`}
                  {...css({ marginBottom: 0 })}
                />
              </CircleMaskDiv>
            </Animated>
            <Animated as="span">
              <TextLink href="https://twitter.com/lucastswick">
                <TiSocialTwitter size={"8rem"} color={theme.colors.pink} />
              </TextLink>
            </Animated>
          </div>
          <div {...center}>
            <Animated as="div">
              <Obfuscate
                email="lucas@lucastswick.com"
                headers={{
                  subject: "Questions about Generative Art",
                }}
              />
            </Animated>
          </div>
        </div>
        <Newsletter />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ theme }) => ({
  theme,
});

export default connect(mapStateToProps)(Contact);
