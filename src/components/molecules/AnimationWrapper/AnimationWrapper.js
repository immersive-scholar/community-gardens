import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Transition from "react-transition-group/Transition";
import get from "lodash/get";

import * as animations from "./animations";

/**
 * @author [Lucas Swick](https://github.com/lucastswick)
 *
 * @class AnimationWrapper
 * @extends {Component}
 */
class AnimationWrapper extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      revealed: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inProp && nextProps.once && !this.state.revealed) {
      this.setState({
        revealed: true
      });
    }
  }

  render() {
    const {
      inProp,
      children,
      transitionName,
      delay,
      blockable,
      duration,
      fullWidth,
      fullHeight,
      height,
      width
    } = this.props;
    const { revealed } = this.state;
    const arrayOfChildren = React.Children.toArray(children);

    const theAnimation = get(animations, transitionName);
    const theStyle = theAnimation.default;
    const theTransition = theAnimation;
    const theHeight = fullHeight ? "100%" : height ? height : "auto";
    const theWidth = fullWidth ? "100%" : width ? width : "auto";

    return (
      <Transition in={inProp || revealed} timeout={duration}>
        {state => (
          <div
            style={{
              ...theStyle({ duration, delay, blockable }),
              ...theTransition[state]({ duration, delay, blockable }),
              height: theHeight,
              width: theWidth
            }}
          >
            {arrayOfChildren}
          </div>
        )}
      </Transition>
    );
  }
}

AnimationWrapper.propTypes = {
  inProp: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  transitionName: PropTypes.oneOf([
    "simpleBlock",
    "drawerVertical",
    "drawerVerticalReverse",
    "drop",
    "fadeAndTwist",
    "fadeAndZoomIn",
    "fadeIn",
    "slideIn",
    "slideInLeft",
    "slideInRight",
    "slideUp"
  ]),
  duration: PropTypes.number,
  delay: PropTypes.number,
  blockable: PropTypes.bool,
  once: PropTypes.bool,
  /** width: 100% */
  fullWidth: PropTypes.bool,
  /** height: 100% */
  fullHeight: PropTypes.bool,
  /** height in pixels, overwritten by fullHeight */
  height: PropTypes.number,
  /** width in pixels, overwritten by fullWidth */
  width: PropTypes.number
};

AnimationWrapper.defaultProps = {
  inProp: false,
  children: [],
  transitionName: "slideIn",
  duration: 300,
  delay: 0,
  blockable: false,
  once: false,
  fullHeight: false,
  fullWidth: false
};

export default AnimationWrapper;
