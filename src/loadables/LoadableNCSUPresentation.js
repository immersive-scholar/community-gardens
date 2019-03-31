import React from "react";
import Loadable from "react-loadable";

import { LoadablePage } from "components/molecules/LoadableComponent";

const LoadableNSCUPresentation = Loadable({
  loader: () => import("../pages/Presentation"),
  loading: LoadablePage,
  render(loaded, props) {
    const Component = loaded.default;
    return <Component {...props} />;
  },
});

export default LoadableNSCUPresentation;
