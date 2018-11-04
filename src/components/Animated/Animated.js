import React from "react";
import { Watch } from "scrollmonitor-react";

import AnimationWrapper from "../AnimationWrapper";

const Animated = ({ isInViewport, children, as, delay = 50 }) => {
  const Component = as || "p";
  return (
    <AnimationWrapper
      inProp={isInViewport}
      transitionName="slideUp"
      delay={delay}
      once
    >
      <Component {...this.props}>{children}</Component>
    </AnimationWrapper>
  );
};

export default Watch(Animated);
