import React from "react";
import Loadable from "react-loadable";

import { LoadablePage } from "components/molecules/LoadableComponent";

const LoadableCV = Loadable({
  loader: () => import("../pages/Home"),
  loading: LoadablePage,
  render(loaded, props) {
    const Component = loaded.default;
    return <Component {...props} />;
  }
});

export default LoadableCV;
