import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { chapters } from "actions";
import TextLink from "components/atoms/TextLink";
import FillButton from "components/atoms/FillButton";
import {
  ImageCopyBlock,
  CopyImageBlock
} from "components/organisms/ImageCopyBlock";
import Animated from "components/molecules/Animated";
import Marquee from "components/molecules/Marquee";
import PathToPicture from "util/PathToPicture";
import Newsletter from "components/organisms/Newsletter";
import Footer from "components/organisms/Footer";

import {
  textContainer,
  wideContainer,
  link,
  shadowless,
  removePaddingTop,
  center,
  lead
} from "styles";

class Home extends PureComponent {
  constructor(props) {
    super(props);

    const season = Math.random() > 0.5 ? "fall" : "summer";

    const headerImage = PathToPicture("headers", `community-gardens-${season}`);

    this.state = { headerImage };
  }

  render() {
    const { chapters, theme } = this.props;
    const { headerImage } = this.state;

    const summerGarden = chapters.summerGarden;
    const winterGarden = chapters.winterGarden;
    const randomGarden = chapters.randomGarden;

    return (
      <div>
        <Marquee
          image={headerImage}
          title="Community Gardens"
          subtitle="100% pure data-driven generative art"
        />
        <div {...textContainer}>
          <Helmet
            title="Community Gardens"
            description="Community Gardens is a data-driven generative art installation using gardens as metaphor to discuss food and housing insecurity within the student body at NC State."
          />

          <Animated as="h1">Community Gardens</Animated>
          <Animated {...lead}>
            Community Gardens is a data-driven generative art installation that
            uses gardens as a metaphor to discuss food and housing insecurity
            within the NC State student body.
          </Animated>
          <Animated>
            In summer, plants have all the resources they need to thrive. In
            winter, less so. Using data collected by{" "}
            <a
              {...shadowless}
              {...link}
              target="_blank"
              rel="nofollow noopener noreferrer"
              href="https://psychology.chass.ncsu.edu/faculty_staff/mehasket"
            >
              Dr Haskett
            </a>, each student becomes a plant in the garden. Depending on the
            data, plants are created with different attributes. The sizes,
            shapes, colors and species change according to the data.
          </Animated>
          <Animated>
            Students that are First Generation have mazes on their leaves
            because they have extra challenges to navigate. Students who have
            been awarded grants have golden leaves. Students who experience
            housing insecurity are more affected by the wind. These are just a
            few examples of how the data is visualized.{" "}
            <Link to="/data" {...shadowless} {...link}>
              Read more about how data affects the plants.
            </Link>
          </Animated>

          <Animated as="h2">Gardens</Animated>
          <Animated>
            Each garden represents a grouping of students around common
            datapoints.
          </Animated>
        </div>
        <div {...wideContainer}>
          <ImageCopyBlock
            item={summerGarden}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
          />
          <CopyImageBlock
            item={winterGarden}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
          />
          <ImageCopyBlock
            item={randomGarden}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
          />
          <Animated {...center}>
            <FillButton
              to="/gardens"
              label="See all the gardens"
              theme={theme}
            />
          </Animated>
        </div>
        <div {...textContainer} {...removePaddingTop}>
          <Animated as="p">
            <TextLink label="View the gallery" to="/gallery" />, learn more
            about how the{" "}
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

const mapStateToProps = ({ chapters, theme }) => ({
  chapters: chapters.node,
  theme
});

const mapDispatchToProps = dispatch => ({
  focusChapter: bindActionCreators(chapters.focusChapter, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
