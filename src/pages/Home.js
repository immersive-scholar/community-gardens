import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

import {
  textContainer,
  center,
  removeMarginBottom,
  removeMarginVertical,
  shadowless,
  bulletless,
  removePaddingBottom,
  removePaddingVertical,
  thirdWidth,
  fullWidthSm
} from "styles";

class Home extends PureComponent {
  render() {
    return (
      <div>
        <Helmet
          title="Community Gardens"
          description="Community Gardens is a data-driven generative art installation using gardens as metaphor to discuss food and housing insecurity within the student body at NCSU."
        />
        <div>HOME</div>
        <Link {...shadowless} to={"/garden"}>
          Garden
        </Link>{" "}
      </div>
    );
  }
}

export default Home;
