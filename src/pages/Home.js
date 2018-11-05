import React, { PureComponent, Fragment } from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import map from "lodash/map";

import { chapters } from "actions";
import Animated from "components/Animated";
import PathToPicture from "util/PathToPicture";
import Image from "../components/Image";

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
  constructor(props) {
    super(props);

    const season = Math.random() > 0.5 ? "fall" : "summer";

    const headerImage = PathToPicture("headers", `community-gardens-${season}`);

    this.state = { headerImage };
  }
  render() {
    const { chapters } = this.props;
    const { headerImage } = this.state;

    return (
      <Fragment>
        <Image ratio="16x9" sources={headerImage} />
        <div {...textContainer}>
          <Helmet
            title="Community Gardens"
            description="Community Gardens is a data-driven generative art installation using gardens as metaphor to discuss food and housing insecurity within the student body at NCSU."
          />

          <Animated as="h1">Community Gardens</Animated>
          <Animated>
            Community Gardens is a data-driven generative art installation that
            uses gardens as a metaphor to discuss food and housing insecurity
            within the NCSU student body.
          </Animated>
          <Animated>
            In summer, plants have all the resources they need to thrive. In
            winter, less so. Using data collected by{" "}
            <a
              target="_blank"
              rel="nofollow noopener noreferrer"
              href="https://psychology.chass.ncsu.edu/faculty_staff/mehasket"
            >
              Dr Haskett
            </a>, each student becomes a plant in the garden. Depending on the
            data, plants of varying types are created that are taller or shorter
            with differing amounts of leaves and berries.
          </Animated>
          <Animated as="h2">Gardens</Animated>

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
      </Fragment>
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
