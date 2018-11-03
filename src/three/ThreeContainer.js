import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import threeEntryPoint from "three/ThreeEntryPoint";
import { settings } from "actions";

class ThreeContainer extends Component {
  static propTypes = {
    timeMultiplier: PropTypes.number,
    quantityMultiplier: PropTypes.number
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

const mapStateToProps = state => ({
  timeMultiplier: state.settings.timeMultiplier,
  quantityMultiplier: state.settings.quantityMultiplier
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
