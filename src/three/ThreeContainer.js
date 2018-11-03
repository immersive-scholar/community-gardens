import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import threeEntryPoint from "three/ThreeEntryPoint";
import { settings } from "actions";
import { stat } from "fs";

class ThreeContainer extends Component {
  static propTypes = {
    timeMultiplier: PropTypes.number,
    quantityMultiplier: PropTypes.number,
    seed: PropTypes.number
  };

  componentDidMount() {
    // by passing props down to threeEntryPoint, we can leverage anything in our redux store during initialization.
    this.threeEntryPoint = threeEntryPoint(this.threeRootElement, this.props);
  }

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
  seed: settings.seed
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
