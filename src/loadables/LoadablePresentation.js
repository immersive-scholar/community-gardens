import React from "react";
import Loadable from "react-loadable";

import { LoadablePage } from "components/molecules/LoadableComponent";

const LoadablePresentation = Loadable({
  loader: () => import("../pages/Presentation/Presentation"),
  loading: LoadablePage,
  render(loaded, props) {
    const Component = loaded.default;
    return <Component {...props} />;
  },
});

export default LoadablePresentation;
