import React, { PureComponent } from "react";
import Helmet from "react-helmet";

import TextLink from "components/atoms/TextLink";
import Image from "components/atoms/Image";
import Animated from "components/molecules/Animated";
import PathToPicture from "util/PathToPicture";
import Newsletter from "components/organisms/Newsletter";
import Footer from "components/organisms/Footer";

import { textContainer, bulletless, removeMarginLeft } from "styles";

class Credits extends PureComponent {
  componentWillMount() {
    const headerImage = PathToPicture("headers", `credits`);
    this.setState({ headerImage });
  }

  render() {
    const { headerImage } = this.state;

    const theme = {
      baseColor: "#fbb3d1",
      colors: ["#ec468a", "#fbb3d1", "#ffffff", "#c25482"]
    };

    return (
      <div>
        <Image ratio="16x9" sources={headerImage} />
        <div {...textContainer}>
          <Helmet
            title="Community Gardens Credits"
            description="The team behind Community Gardens."
          />
          <Animated as="h1">Credits</Animated>

          <Animated>
            Community Gardens is concepted and engineered by{" "}
            <TextLink href="https://generativeartist.com" label="lucastswick" />{" "}
            during a six-week artist residency funded by the{" "}
            <TextLink
              href="https://mellon.org/"
              label="Andrew Mellon Foundation"
            />{" "}
            through the{" "}
            <TextLink
              href="https://www.immersivescholar.org/"
              label="Immersive Scholar"
            />{" "}
            program with{" "}
            <TextLink href="https://www.ncsu.edu/" label="NC State" />.
          </Animated>

          <Animated as="h2">Core Team</Animated>

          <ul {...removeMarginLeft}>
            <li {...bulletless}>
              <TextLink
                href="https://jlangdesign.github.io/about.html"
                label="Jasmine Lang"
              />
              , Branding and UI/UX
            </li>

            <li {...bulletless}>
              <TextLink
                href="https://www.lib.ncsu.edu/staff/eyhayes"
                label="Erica Hayes"
              />
              , Project Manager
            </li>

            <li {...bulletless}>
              <TextLink
                href="https://www.lib.ncsu.edu/staff/sjhallma"
                label="Shelby Hallman"
              />
              , Co-PI
            </li>

            <li {...bulletless}>
              <TextLink
                href="https://www.lib.ncsu.edu/staff/mgwust"
                label="Markus Wust"
              />
            </li>
          </ul>

          <Animated as="h2">Could not have done it without</Animated>

          <ul {...removeMarginLeft}>
            <li {...bulletless}>
              <TextLink
                href="https://faculty.chass.ncsu.edu/mehasket"
                label="Dr Mary Haskett"
              />, for the data
            </li>

            <li {...bulletless}>
              <TextLink
                href="https://www.lib.ncsu.edu/staff/kacollin"
                label="Karen Ciccone"
              />, for researching plant types native to North Carolina
            </li>

            <li {...bulletless}>
              <TextLink
                href="https://trio.dasa.ncsu.edu/student-support-services/about/our-staff/"
                label="Sarah Wright"
              />, for all her advocacy work
            </li>

            <li {...bulletless}>
              <TextLink
                href="https://www.lib.ncsu.edu/staff/mlvandeg"
                label="Micah Vandegrift"
              />, for believing in me
            </li>
          </ul>

          <Animated as="h2">Special thanks to</Animated>

          <ul {...removeMarginLeft}>
            <li {...bulletless}>
              <TextLink
                href="https://www.lib.ncsu.edu/staff/mrenda"
                label="Molly Renda"
              />{" "}
              for creating the print exhibition
            </li>

            <li {...bulletless}>
              <TextLink
                href="https://www.lib.ncsu.edu/staff/srodgers"
                label="Shirley Rodgers"
              />{" "}
              for assistance with hardware testing
            </li>

            <li {...bulletless}>
              <TextLink
                href="https://www.lib.ncsu.edu/staff/jwgurley"
                label="Walt Gurley"
              />{" "}
              for the encouragement and brainstorming
            </li>

            <li {...bulletless}>
              <TextLink
                href="https://www.lib.ncsu.edu/staff/mgfragol"
                label="Marian Fragola"
              />{" "}
              for making the presentations an enormous success
            </li>
            <li {...bulletless}>
              <TextLink
                href="https://www.lib.ncsu.edu/staff/hlrainey"
                label="Hannah Rainey"
              />{" "}
              for the bibimbap
            </li>
          </ul>
        </div>

        <Newsletter />
        <Footer />
      </div>
    );
  }
}

export default Credits;
