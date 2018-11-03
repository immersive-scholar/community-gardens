import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import threeEntryPoint from "three/ThreeEntryPoint";
import { settings } from "actions";

class ThreeContainer extends Component {
  static propTypes = {
    timeMultiplier: PropTypes.number,
    quantityMultiplier: PropTypes.number,
    seed: PropTypes.number,
    dpr: PropTypes.number,
    antiAlias: PropTypes.bool
  };

  componentDidMount() {
    document.addEventListener("gesturestart", this.preventScroll);

    // by passing props down to threeEntryPoint, we can leverage anything in our redux store during initialization.
    this.threeEntryPoint = threeEntryPoint(this.threeRootElement, this.props);
  }

  componnetWillUnmount() {
    document.removeEventListener("gesturestart", this.preventScroll);
  }

  preventScroll = e => {
    e.preventDefault();
  };

  shouldComponentUpdate(nextProps) {
    this.threeEntryPoint.setSettings(nextProps);
    // there is never any need to render,
    // because ThreeEntryPoint is responsible for it's own rendering.
    return false;
  }

  render() {
    return <div ref={element => (this.threeRootElement = element)} />;
  }
}

const mapStateToProps = ({ settings }) => ({
  timeMultiplier: settings.timeMultiplier,
  quantityMultiplier: settings.quantityMultiplier,
  seed: settings.seed,
  dpr: settings.dpr,
  antiAlias: settings.antiAlias,
  debug: settings.debug
});

const mapDispatchToProps = dispatch => ({
  setTimeMultiplier: bindActionCreators(settings.setTimeMultiplier, dispatch),
  setQuantityMultiplier: bindActionCreators(
    settings.setQuantityMultiplier,
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreeContainer);
