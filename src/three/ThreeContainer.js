import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import get from "lodash/get";

import Modal from "components/molecules/Modal";
import AboutModalContents from "components/organisms/AboutModalContents";
import ThreeControlBar from "components/organisms/ThreeControlBar";
import ImmersiveScholarLogo from "components/atoms/ImmersiveScholarLogo";
import Infobar from "components/molecules/Infobar";
import threeEntryPoint from "three/ThreeEntryPoint";

import { settings, chapters } from "actions";
import { getSelectedChapter } from "reducers";
import { css } from "glamor";

class ThreeContainer extends Component {
  static propTypes = {
    timeMultiplier: PropTypes.number,
    quantityMultiplier: PropTypes.number,
    seed: PropTypes.number,
    dpr: PropTypes.number,
    antiAlias: PropTypes.bool,
  };

  componentDidMount() {
    // const gardenID = get(this.props, "match.params.gardenID");
    // if (gardenID) {
    //   this.props.focusChapter(gardenID);
    // }
    // by passing props down to threeEntryPoint, we can leverage anything in our redux store during initialization.
    this.threeEntryPoint = threeEntryPoint(this.threeRootElement, this.props);
    const root = document.getElementById("threeCanvas");
    if (!this.props.inheritSize) {
      root.addEventListener("gesturestart", this.preventScroll);
      document.documentElement.classList.add("state__locked");
    }

    const oldChapterID = get(this.props, "selectedChapterID", "");
    const chapterID = get(this.props, "match.params.gardenID", "");

    if (chapterID && chapterID !== oldChapterID) {
      this.props.focusChapter(chapterID);
    }
  }

  componentWillUnmount() {
    // TweenMax.killAll();

    this.threeEntryPoint.clean();
    const root = document.getElementById("threeCanvas");
    root.removeEventListener("gesturestart", this.preventScroll);
    document.documentElement.classList.remove("state__locked");

    this.props.setAboutModalOpen(false);
  }

  preventScroll = e => {
    e.preventDefault();
  };

  componentDidUpdate(prevProps) {
    const oldChapterID = prevProps.selectedChapterID;
    const chapterID = this.props.selectedChapterID;

    if (chapterID && chapterID !== oldChapterID) {
      this.props.focusChapter(chapterID);
    }

    this.threeEntryPoint.setSettings(this.props);

    if (this.props.playing) {
      this.threeEntryPoint.play();
    } else {
      this.threeEntryPoint.pause();
    }
  }

  render() {
    let {
      showControlBar,
      showImmersiveScholarLogo,
      showSidebar,
      aboutModalOpen,
      setAboutModalOpen,
    } = this.props;

    // overrides
    if (Object.keys(this.props).indexOf("overrideShowControlBar") > -1) {
      if (this.props.overrideShowControlBar === false) {
        showControlBar = false;
      }
    }

    return (
      <Fragment>
        <Modal open={aboutModalOpen} onClose={() => setAboutModalOpen(false)}>
          <AboutModalContents />
        </Modal>
        {showControlBar && (
          <div
            {...css({
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: 101,
            })}
          />
        )}
        {showControlBar && <ThreeControlBar />}
        {showSidebar && <Infobar />}
        {showImmersiveScholarLogo && <ImmersiveScholarLogo />}
        <div ref={element => (this.threeRootElement = element)} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { settings, chapters } = state;
  return {
    timeMultiplier: settings.timeMultiplier,
    quantityMultiplier: settings.quantityMultiplier,
    seed: settings.seed,
    dpr: settings.dpr,
    antiAlias: settings.antiAlias,
    debug: settings.debug,
    playing: settings.playing,
    show3DTitles: settings.show3DTitles,
    showControlBar: settings.showControlBar,
    aboutModalOpen: settings.aboutModalOpen,
    showImmersiveScholarLogo: settings.showImmersiveScholarLogo,
    showSidebar: settings.showSidebar,
    sidebarWidth: settings.sidebarWidth,
    selectedChapterID: chapters.selectedID,
    selectedChapter: getSelectedChapter(state),
  };
};

const mapDispatchToProps = dispatch => ({
  setTimeMultiplier: bindActionCreators(settings.setTimeMultiplier, dispatch),
  setQuantityMultiplier: bindActionCreators(
    settings.setQuantityMultiplier,
    dispatch
  ),
  focusChapter: bindActionCreators(chapters.focusChapter, dispatch),
  setPlaying: bindActionCreators(settings.setPlaying, dispatch),
  setAboutModalOpen: bindActionCreators(settings.setAboutModalOpen, dispatch),
  setInitComplete: bindActionCreators(settings.setInitComplete, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreeContainer);
