import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import get from "lodash/get";

import threeEntryPoint from "three/ThreeEntryPoint";
import { settings, chapters } from "actions";
import { TweenMax } from "gsap";

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

  shouldComponentUpdate(nextProps) {
    // this.threeEntryPoint.setSettings(nextProps);
    // there is never any need to render,
    // because ThreeEntryPoint is responsible for it's own rendering.

    return false;
  }

  render() {
    return <div ref={element => (this.threeRootElement = element)} />;
  }
}

const mapStateToProps = ({ settings, chapters }) => ({
  timeMultiplier: settings.timeMultiplier,
  quantityMultiplier: settings.quantityMultiplier,
  seed: settings.seed,
  dpr: settings.dpr,
  antiAlias: settings.antiAlias,
  debug: settings.debug,
  selectedChapterID: chapters.selectedID
});

const mapDispatchToProps = dispatch => ({
  setTimeMultiplier: bindActionCreators(settings.setTimeMultiplier, dispatch),
  setQuantityMultiplier: bindActionCreators(
    settings.setQuantityMultiplier,
    dispatch
  ),
  focusChapter: bindActionCreators(chapters.focusChapter, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreeContainer);
