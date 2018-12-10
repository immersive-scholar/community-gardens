import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Helmet from "react-helmet";

import { chapters } from "actions";
import Animated from "components/molecules/Animated";
import Marquee from "components/molecules/Marquee";
import TextLink from "components/atoms/TextLink";
import {
  ImageCopyBlock,
  CopyImageBlock
} from "components/organisms/ImageCopyBlock";
import PathToPicture from "util/PathToPicture";
import Newsletter from "components/organisms/Newsletter";
import Footer from "components/organisms/Footer";

import { textContainer, wideContainer, removePaddingTop } from "styles";

class Gardens extends PureComponent {
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
    const housingInsecurity = chapters.housingInsecurity;
    const highResources = chapters.resourced;
    const energyOutgoing = chapters.energyOutgoing;
    const firstGeneration = chapters.firstGeneration;
    const winterGarden = chapters.winterGarden;
    const randomGarden = chapters.randomGarden;

    return (
      <div>
        <Helmet
          title="Community Gardens"
          description="Community Gardens is a data-driven generative art installation using gardens as metaphor to discuss food and housing insecurity within the student body at NC State."
        />
        <Marquee
          image={headerImage}
          title="Community Gardens"
          subtitle="Explore the interactive gardens"
        />
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
)(Gardens);
