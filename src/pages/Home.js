import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import map from "lodash/map";

import { chapters } from "actions";
import Animated from "components/Animated";

import {
  textContainer,
  buttonStyle,
  fillButton,
  center,
  removeMarginBottom,
  removeMarginVertical,
  shadowless,
  bulletless,
  removePaddingBottom,
  removePaddingVertical,
  thirdWidth,
  fullWidthSm,
  grid
} from "styles";

class Home extends PureComponent {
  render() {
    const { chapters } = this.props;
    return (
      <div {...textContainer}>
        <Helmet
          title="Community Gardens"
          description="Community Gardens is a data-driven generative art installation using gardens as metaphor to discuss food and housing insecurity within the student body at NCSU."
        />
        <Animated as="h1">Gardens</Animated>
        <Animated delay={150}>
          Community Gardens is a data-driven generative art installation that
          uses gardens as a metaphor to discuss food and housing insecurity
          within the NCSU student body.
        </Animated>
        <Animated delay={300}>
          In summer, plants have all the resources they need to thrive. In
          winter, resources are scarce.
        </Animated>
        <Animated delay={450}>
          It is not the fault of the plant that resources are not available.
        </Animated>
        <div {...grid}>
          {map(chapters, chapter => {
            return (
              <Link
                key={chapter.id}
                {...shadowless}
                {...buttonStyle}
                {...fillButton}
                to={chapter.link}
              >
                {chapter.title}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ chapters }) => ({
  chapters: chapters.node
});

const mapDispatchToProps = dispatch => ({
  focusChapter: bindActionCreators(chapters.focusChapter, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
