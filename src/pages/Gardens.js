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
  CopyImageBlock,
} from "components/organisms/ImageCopyBlock";
import WebbyBanner from "components/atoms/FillButton/WebbyBanner";

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
    const highGpa = chapters.highGpa;
    const highResources = chapters.resourced;
    const energyOutgoing = chapters.energyOutgoing;
    const firstGeneration = chapters.firstGeneration;
    const winterGarden = chapters.winterGarden;
    const randomGarden = chapters.randomGarden;
    const wellness = chapters.wellness;
    const holiday = chapters.holidayCard;

    return (
      <div>
        <Helmet
          title="Community Gardens"
          description="Community Gardens is a data-driven generative art installation using gardens as metaphor to discuss food and housing insecurity within the student body at NC State."
        />
        <WebbyBanner />
        <Marquee
          image={headerImage}
          title="Community Gardens"
          subtitle="Explore the interactive gardens"
        />
        <div {...wideContainer}>
          <ImageCopyBlock
            item={{
              ...summerGarden,
              excerpt:
                "Plants in the Summer Garden have all the resources they need to thrive.",
            }}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
          />
          <CopyImageBlock
            item={{
              ...winterGarden,
              excerpt:
                "Plants in the Winter Garden have inadequate resources. Imagine having to choose between buying a textbook or paying your rent.",
            }}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
          />
          <ImageCopyBlock
            item={{
              ...wellness,
              excerpt:
                "Plants in the Wellness Garden indicate a high level of emotional health.",
            }}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
          />
          <CopyImageBlock
            item={{
              ...highGpa,
              excerpt: "Plants in the High GPA Garden are doing very well.",
            }}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
          />

          <ImageCopyBlock
            item={{
              ...firstGeneration,
              excerpt:
                "Plants in the First Generation Garden parents (or guardians) have obtained a bachelor’s degree. Imagine having to navigate the complexities of applying for college without the guidance and support of someone who's done it.",
            }}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
          />
          <CopyImageBlock
            item={{
              ...housingInsecurity,
              excerpt:
                "Plants in the Housing Insecurity Garden have experienced homeless within the past year.",
            }}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
          />
          <ImageCopyBlock
            item={{
              ...highResources,
              excerpt:
                "Plants in the High Resources Garden have deep support structures so they can focus on their studies.",
            }}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
          />
          <CopyImageBlock
            item={{
              ...energyOutgoing,
              excerpt:
                "Plants in the Energy Outgoing Garden are working lots, taking care of kids, and generally not sleeping enough.",
            }}
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
          <CopyImageBlock
            item={{
              ...holiday,
              excerpt: "Happy Holidays!",
            }}
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
  theme,
});

const mapDispatchToProps = dispatch => ({
  focusChapter: bindActionCreators(chapters.focusChapter, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gardens);
