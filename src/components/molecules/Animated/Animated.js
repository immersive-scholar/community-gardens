import React from "react";
import { Watch } from "scrollmonitor-react";

import AnimationWrapper from "components/molecules/AnimationWrapper";

const Animated = ({
  isInViewport,
  children,
  as,
  delay = 50,
  autoStart = false,
  isAboveViewport = false,
  isBelowViewport = false,
  isFullyInViewport = false,
  lockWatcher = false,
  unlockWatcher = false,
  startWatcher = false,
  stopWatcher = false,
  ...otherProps
}) => {
  const Component = as || "p";
  return (
    <AnimationWrapper
      inProp={isInViewport}
      transitionName="slideUp"
      delay={delay}
      once
    >
      <Component {...otherProps}>{children}</Component>
    </AnimationWrapper>
  );
};

export default Watch(Animated);
