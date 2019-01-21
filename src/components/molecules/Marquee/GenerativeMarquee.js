import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ClipLoader from "react-spinners/ClipLoader";
import { TweenMax } from "gsap";
import ScrollToPlugin from "gsap/umd/ScrollToPlugin";

import { chapters, settings } from "actions";

import Reveal from "components/atoms/Image/Reveal";
import ThreeContainer from "three/ThreeContainer";

import { removeMarginVertical, lightText } from "styles";
import {
  MarqueeWrapper,
  Fader,
  fadeOut,
  CanvasWrapper,
  TextWrapper,
  titleStyles,
  subtitleStyles,
  miniSubtitle,
  Arrow,
  BounceAnimation,
} from "./styles";

class GenerativeMarquee extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { delayedRevealID: 0, delayedReveal: false, hideArrow: false };
  }
  componentDidMount() {
    this.props.focusChapter("random-garden");
    this.props.setPlaying(true);
  }

  componentWillUnmount() {
    this.props.setPlaying(false);
    clearTimeout(this.state.delayedRevealID);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initComplete !== this.props.initComplete) {
      let { delayedRevealID } = this.state;
      if (delayedRevealID) {
        clearTimeout(delayedRevealID);
      }

      delayedRevealID = setTimeout(() => {
        this.setState({ delayedReveal: true });
      }, 3000);

      this.setState({ delayedRevealID });
    }
  }

  scrollToContents = () => {
    const ref = this.props.scrollTo;
    console.log("ref ", ref);
    // window.scrollTo(0, ref.current.offsetTop);
    TweenMax.to(window, 0.5, {
      scrollTo: ref.current.offsetTop,
    });

    this.setState({ hideArrow: true });
  };

  render() {
    const { title, subtitle, initComplete, theme } = this.props;
    const { delayedReveal, hideArrow } = this.state;

    return (
      <MarqueeWrapper id="marquee">
        <CanvasWrapper>
          <ThreeContainer overrideShowControlBar={false} inheritSize={true} />
        </CanvasWrapper>
        {!hideArrow && (
          <BounceAnimation
            onClick={() => {
              this.scrollToContents();
            }}
          >
            <Arrow />
          </BounceAnimation>
        )}
        <Reveal ratio="16x9" theme={theme} reveal={delayedReveal} />
        <Fader {...(initComplete ? fadeOut : {})}>
          <TextWrapper {...(initComplete ? fadeOut : {})}>
            <div>
              {title && (
                <h1 {...removeMarginVertical} {...lightText} {...titleStyles}>
                  {title}
                </h1>
              )}
              {subtitle && (
                <h2 {...lightText} {...subtitleStyles} {...miniSubtitle}>
                  {subtitle}
                </h2>
              )}
              <ClipLoader
                color="#ffffff"
                sizeUnit={"px"}
                size={50}
                loading={!initComplete}
              />
            </div>
          </TextWrapper>
        </Fader>
      </MarqueeWrapper>
    );
  }
}

const mapStateToProps = ({ settings, theme }) => ({
  theme,
  initComplete: settings.initComplete,
});

const mapDispatchToProps = dispatch => ({
  focusChapter: bindActionCreators(chapters.focusChapter, dispatch),
  setPlaying: bindActionCreators(settings.setPlaying, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenerativeMarquee);
