import React, { PureComponent } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { chapters } from "actions";
import Animated from "components/molecules/Animated";
import Image from "components/atoms/Image";
import TextLink from "components/atoms/TextLink";
import {
  ImageCopyBlock,
  CopyImageBlock
} from "components/organisms/ImageCopyBlock";
import PathToPicture from "util/PathToPicture";
import Newsletter from "components/organisms/Newsletter";
import Footer from "components/organisms/Footer";

import { textContainer, wideContainer, removePaddingTop, center } from "styles";

class Gardens extends PureComponent {
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
        <Helmet
          title="Community Gardens"
          description="Community Gardens is a data-driven generative art installation using gardens as metaphor to discuss food and housing insecurity within the student body at NC State."
        />

        <div {...textContainer} {...center}>
          <Animated as="h1">Community Gardens</Animated>
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

const mapStateToProps = ({ chapters }) => ({
  chapters: chapters.node
});

const mapDispatchToProps = dispatch => ({
  focusChapter: bindActionCreators(chapters.focusChapter, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gardens);
