import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import get from "lodash/get";

import ThreeControlBar from "components/organisms/ThreeControlBar";
import threeEntryPoint from "three/ThreeEntryPoint";
import { settings, chapters } from "actions";
import { getSelectedChapter } from "reducers";

class ThreeContainer extends Component {
  static propTypes = {
    timeMultiplier: PropTypes.number,
    quantityMultiplier: PropTypes.number,
    seed: PropTypes.number,
    dpr: PropTypes.number,
    antiAlias: PropTypes.bool
  };

  componentDidMount() {
    // const gardenID = get(this.props, "match.params.gardenID");
    // if (gardenID) {
    //   this.props.focusChapter(gardenID);
    // }
    // by passing props down to threeEntryPoint, we can leverage anything in our redux store during initialization.
    this.threeEntryPoint = threeEntryPoint(this.threeRootElement, this.props);
    const root = document.getElementById("three-canvas");
    root.addEventListener("gesturestart", this.preventScroll);
    document.documentElement.classList.add("state__locked");

    const oldChapterID = get(this.props, "selectedChapterID", "");
    const chapterID = get(this.props, "match.params.gardenID", "");

    if (chapterID && chapterID !== oldChapterID) {
      this.props.focusChapter(chapterID);
    }
  }

  componentWillUnmount() {
    // TweenMax.killAll();

    this.threeEntryPoint.clean();
    const root = document.getElementById("three-canvas");
    root.removeEventListener("gesturestart", this.preventScroll);
    document.documentElement.classList.remove("state__locked");
  }

  preventScroll = e => {
    console.log("preventScroll ", e);
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
    const { showControlBar } = this.props;
    return (
      <Fragment>
        {showControlBar && <ThreeControlBar />}
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
    selectedChapterID: chapters.selectedID,
    selectedChapter: getSelectedChapter(state)
  };
};

const mapDispatchToProps = dispatch => ({
  setTimeMultiplier: bindActionCreators(settings.setTimeMultiplier, dispatch),
  setQuantityMultiplier: bindActionCreators(
    settings.setQuantityMultiplier,
    dispatch
  ),
  focusChapter: bindActionCreators(chapters.focusChapter, dispatch),
  setPlaying: bindActionCreators(settings.setPlaying, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreeContainer);
