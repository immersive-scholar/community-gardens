import React from "react";
import Loadable from "react-loadable";

import { LoadablePage } from "components/molecules/LoadableComponent";

const LoadableThreeContainer = Loadable({
  loader: () => import("../three/ThreeContainer"),
  loading: LoadablePage,
  render(loaded, props) {
    const Component = loaded.default;
    return <Component {...props} />;
  },
});

export default LoadableThreeContainer;
