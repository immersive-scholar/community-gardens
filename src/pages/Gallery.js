import React, { PureComponent } from "react";
import Helmet from "react-helmet";
import { css } from "glamor";

import Animated from "components/molecules/Animated";
import ShortMarquee from "components/molecules/Marquee/ShortMarquee";
import PathToPicture from "util/PathToPicture";
import GalleryTemplate from "components/molecules/Gallery/GalleryTemplate";
import Newsletter from "components/organisms/Newsletter";
import Footer from "components/organisms/Footer";

import { lead, textContainer, removePaddingBottom } from "styles";

class GalleryPage extends PureComponent {
  componentWillMount() {
    const solomonsSealGroup = [
      PathToPicture("gallery", "community-gardens-gallery-5"),
      PathToPicture("gallery", "community-gardens-gallery-3"),
      PathToPicture("gallery", "community-gardens-gallery-1"),
      PathToPicture("gallery", "community-gardens-gallery-2"),
      PathToPicture("gallery", "community-gardens-gallery-4")
    ];

    const plantPortraits = [
      PathToPicture("gallery", "community-gardens-gallery-8"),
      PathToPicture("gallery", "community-gardens-gallery-6"),
      PathToPicture("gallery", "community-gardens-gallery-7")
    ];

    const summerGarden = [
      PathToPicture("gallery", "community-gardens-gallery-9"),
      PathToPicture("gallery", "community-gardens-gallery-10"),
      PathToPicture("gallery", "community-gardens-gallery-11"),
      PathToPicture("gallery", "community-gardens-gallery-12"),
      PathToPicture("gallery", "community-gardens-gallery-13")
    ];

    const fallGarden = [
      PathToPicture("gallery", "community-gardens-gallery-17"),
      PathToPicture("gallery", "community-gardens-gallery-18"),
      PathToPicture("gallery", "community-gardens-gallery-19"),
      PathToPicture("gallery", "community-gardens-gallery-20"),
      PathToPicture("gallery", "community-gardens-gallery-21"),
      PathToPicture("gallery", "community-gardens-gallery-22"),
      PathToPicture("gallery", "community-gardens-gallery-23")
    ];

    const xmas = [
      PathToPicture("gallery", "community-gardens-gallery-29"),
      PathToPicture("gallery", "community-gardens-gallery-30"),
      PathToPicture("gallery", "community-gardens-gallery-31"),
      PathToPicture("gallery", "community-gardens-gallery-32")
    ];

    this.setState({
      solomonsSealGroup,
      plantPortraits,
      summerGarden,
      fallGarden,
      xmas
    });
  }

  render() {
    const {
      solomonsSealGroup,
      plantPortraits,
      summerGarden,
      fallGarden,
      xmas
    } = this.state;

    return (
      <div {...css({ background: "#efefef" })}>
        <Helmet
          title="Community Gardens Gallery"
          description="Images from Community Gardens."
        />
        <ShortMarquee title="Gallery" subtitle="Images from the gardens" />
        <div {...textContainer} {...removePaddingBottom}>
          <Animated {...lead}>
            Because each garden is created with code, every single time a garden
            is viewed it is unique. You will never see the exact same garden
            twice.
          </Animated>
          <Animated>These are a few images captured from the gardens.</Animated>
        </div>
        <GalleryTemplate title="Solomon's Seal" pictures={solomonsSealGroup} />
        <GalleryTemplate title="Plant Portraits" pictures={plantPortraits} />
        <GalleryTemplate title="Summer Gardens" pictures={summerGarden} />
        <GalleryTemplate title="Fall Gardens" pictures={fallGarden} />
        <GalleryTemplate title="Xmas 2018" last pictures={xmas} />
        <Newsletter />
        <Footer />
      </div>
    );
  }
}

export default GalleryPage;
