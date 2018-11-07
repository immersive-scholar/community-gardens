import React, { PureComponent } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { slides } from "actions";
import { getSelectedSlide } from "reducers";

import SlideController from "components/molecules/SlideController";
import IntroSlide from "./slides/IntroSlide";
import MeSlide from "./slides/MeSlide";
import GenerativeSlide from "./slides/GenerativeSlide";

import { PageWrapper } from "./styles";

class Presentation extends PureComponent {
  componentWillMount() {
    // const headerImage = PathToPicture("headers", `community-gardens-data`);

    const backgroundFilenames = [
      "hr-1541474916803-2048x2048",
      "hr-1541474986837-2048x2048",
      "hr-1541475258969-2048x2048",
      "hr-1541475347108-2048x2048",
      "hr-1541475561202-2048x2048",
      "hr-1541475664041-2048x2048",
      "hr-1541476768539-2048x2048",
      "hr-1541477034736-2048x2048",
      "hr-1541478064355-2048x2048",
      "hr-1541478160164-2048x2048",
      "hr-1541478795951-2048x2048",
      "hr-1541519404405-2048x2048",
      "hr-1541519465781-2048x2048",
      "hr-1541526484189-2048x2048"
    ];

    const backgrounds = backgroundFilenames.map(filename => [
      {
        srcSet: require(`assets/backgrounds/community-gardens/${filename}.png`)
      }
    ]);

    const blomDark = [];
    for (var i = 1; i < 68; i++) {
      blomDark.push([
        {
          srcSet: require(`assets/backgrounds/blom-dark/blom-a-generative-art-series-by-lucastswick-sm-${i}.jpg`)
        }
      ]);
    }

    const blomLight = [];
    for (var i = 70; i < 95; i++) {
      blomLight.push([
        {
          srcSet: require(`assets/backgrounds/blom-light/blom-a-generative-art-series-by-lucastswick-sm-${i}.jpg`)
        }
      ]);
    }

    const theme = {
      bright: "#fbb3d1",
      pink: "#ec468a",
      colors: ["#fbb3d1", "#ffffff", "#c25482"]
    };

    this.setState({
      backgrounds,
      blomDark,
      blomLight,
      theme
    });
  }

  render() {
    const { selectedSlideID, selectedSlide } = this.props;
    const { backgrounds, blomDark, blomLight, theme } = this.state;
    const SlideClass = selectedSlide.slideClass;

    return (
      <div>
        <Helmet
          title="Community Gardens Presentation"
          description="Presentation materials for Vis Studio at Hill."
        />
        <PageWrapper>
          <SlideController />
          {selectedSlideID === "intro" && (
            <SlideClass backgrounds={blomDark} theme={theme} />
          )}
          {selectedSlideID === "me" && <SlideClass theme={theme} />}
          {selectedSlideID === "generative" && (
            <SlideClass backgrounds={backgrounds} theme={theme} />
          )}
        </PageWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { slides } = state;
  return {
    selectedSlideID: slides.selectedID,
    selectedSlide: getSelectedSlide(state)
  };
};

const mapDispatchToProps = dispatch => ({
  focusSlide: bindActionCreators(slides.focusSlide, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentation);
