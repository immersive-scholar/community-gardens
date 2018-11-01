import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { settings } from "actions";

class Settings extends PureComponent {
  static propTypes = {
    timeMultiplier: PropTypes.number
  };

  render() {
    const { timeMultiplier } = this.props;

    return <h1>TIME MULTIPLIER: {timeMultiplier}</h1>;
  }
}

const mapStateToProps = state => ({
  timeMultiplier: state.settings.timeMultiplier
});

const mapDispatchToProps = dispatch => ({
  setTimeMultiplier: bindActionCreators(settings.setTimeMultiplier, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
