import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { chapters } from "actions";
import Animated from "components/molecules/Animated";
import Image from "components/atoms/Image";
import {
  ImageCopyBlock,
  CopyImageBlock
} from "components/organisms/ImageCopyBlock";
import PathToPicture from "util/PathToPicture";

import { textContainer, wideContainer, link, shadowless } from "styles";

class Home extends PureComponent {
  constructor(props) {
    super(props);

    const season = Math.random() > 0.5 ? "fall" : "summer";

    const headerImage = PathToPicture("headers", `community-gardens-${season}`);

    this.state = { headerImage };
  }

  render() {
    const { chapters } = this.props;
    const { headerImage } = this.state;

    const summerGarden = chapters.summerGarden;
    const housingInsecurity = chapters.housingInsecurity;
    const highResources = chapters.resourced;
    const energyOutgoing = chapters.energyOutgoing;
    const firstGeneration = chapters.firstGeneration;
    const winterGarden = chapters.winterGarden;
    const randomGarden = chapters.randomGarden;

    const theme = {
      baseColor: "#fbb3d1",
      colors: ["#ec468a", "#fbb3d1", "#ffffff", "#c25482"]
    };

    return (
      <div>
        <Image ratio="16x9" sources={headerImage} />
        <div {...textContainer}>
          <Helmet
            title="Community Gardens"
            description="Community Gardens is a data-driven generative art installation using gardens as metaphor to discuss food and housing insecurity within the student body at NC State."
          />

          <Animated as="h1">Community Gardens</Animated>
          <Animated>
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
            housing insecurity are more affected by the wind.{" "}
            <Link to="/data" {...shadowless} {...link}>
              Read more about how data affects the plants.
            </Link>
          </Animated>

          <Animated as="h2">Gardens</Animated>
          <Animated>
            Each garden represents a different grouping of students. Every
            garden is created at the moment you enter it so you will never see
            the exact same garden twice.
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
            item={highResources}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
          />
          <CopyImageBlock
            item={energyOutgoing}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
          />
          <ImageCopyBlock
            item={firstGeneration}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
          />
          <CopyImageBlock
            item={housingInsecurity}
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
        </div>
        {/* <div {...grid}>
            {map(chapters, chapter => {
              return (
                <Link
                  key={chapter.id}
                  {...shadowless}
                  {...buttonStyle}
                  {...fillButton}
                  to={chapter.link}
                >
                  {chapter.title}
                </Link>
              );
            })}
          </div> */}
      </div>
    );
  }
}

const mapStateToProps = ({ chapters }) => ({
  chapters: chapters.node
});

const mapDispatchToProps = dispatch => ({
  focusChapter: bindActionCreators(chapters.focusChapter, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
