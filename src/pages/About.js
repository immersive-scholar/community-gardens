import React, { PureComponent } from "react";
import Helmet from "react-helmet";
import map from "lodash/map";

import Image from "components/atoms/Image";
import TextLink from "components/atoms/TextLink";
import Animated from "components/molecules/Animated";
import PathToPicture from "util/PathToPicture";
import Newsletter from "components/organisms/Newsletter";
import Footer from "components/organisms/Footer";

import {
  textContainer,
  wideContainer,
  lead,
  addMarginBottom,
  removePaddingTop
} from "styles";

class About extends PureComponent {
  componentWillMount() {
    const headerImage = PathToPicture("headers", `about-community-gardens`);
    const aboutImage1 = PathToPicture("about", `community-gardens-about`);
    // const aboutImage2 = PathToPicture("about", `community-gardens-about-2`);
    const aboutImages = [aboutImage1];
    this.setState({ headerImage, aboutImages });
  }

  render() {
    const { headerImage, aboutImages } = this.state;

    return (
      <div>
        <video width="100%" height="auto" autoPlay loop>
          <source src="/vid/header-full.mp4" type="video/mp4" />
          <Image ratio="16x9" sources={headerImage} />
        </video>
        <div {...textContainer}>
          <Helmet
            title="About Community Gardens"
            description="About Community Gardens."
          />
          <Animated as="h1">About Community Gardens</Animated>
          <Animated {...lead}>
            Community Gardens is a data-driven generative art installation.
          </Animated>
          <Animated>
            Concepted and engineered by{" "}
            <TextLink href="https://generativeartist.com" label="lucastswick" />{" "}
            , the installation challenges the stigmas and biases around
            homelessness.
          </Animated>
          <Animated>
            Using <TextLink href="https://threejs.org/" label="threejs" /> and
            running inside a browser, it is responsive to any display size, from
            20' wide displays down to a mobile device.
          </Animated>
        </div>
        <div {...wideContainer} {...removePaddingTop}>
          {map(aboutImages, (image, index) => (
            <div {...addMarginBottom} key={`image-${index}`}>
              <Image sources={image} ratio="4x3" />
            </div>
          ))}
        </div>
        <div {...textContainer} {...removePaddingTop}>
          <Animated as="p">
            Learn more about how the{" "}
            <TextLink label="data affects each individual plant" to="/data" />,
            or <TextLink label="commit to making a change" to="/solutions" />.
          </Animated>
        </div>
        <Newsletter />
        <Footer />
      </div>
    );
  }
}

export default About;
