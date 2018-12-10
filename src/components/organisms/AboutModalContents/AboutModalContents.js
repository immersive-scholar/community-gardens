import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";

import TextLink from "components/atoms/TextLink";
import FillButton from "components/atoms/FillButton";

import { removeMarginTop, center, twoColsLg } from "styles";
import interactive from "./assets/interactive.svg";
import interactive2 from "./assets/interactive-two-finger-zoom.svg";

class AboutModal extends PureComponent {
  render() {
    const { theme } = this.props;

    return (
      <Fragment>
        <h2 {...removeMarginTop}>About Community Gardens.</h2>
        <p>
          Community Gardens is an interactive, data-driven generative art
          project that tells the story of food and housing insecurity at NC
          State.
        </p>
        <div {...twoColsLg}>
          <div>
            <p>
              <b>Interactive</b> means you can explore the world by
              clicking-and-dragging.{" "}
            </p>
            <img
              src={interactive}
              alt="You can click and drag to explore the garden"
            />
          </div>
          <div>
            <p>
              You can scroll (or use two fingers, paired together on mobile) to
              zoom.
            </p>
            <img src={interactive2} alt="You can use two fingers to zoom" />
          </div>
        </div>
        <p>
          <b>Data-driven</b> means the plant's attributes are driven by data.
          Taller plants represent master's students, angular plants indicate
          anxiety, and mazes on leaves represent out-of-state-students. The data
          changes about 15 different attributes per plant.{" "}
          <TextLink to="/data" label="Read more" />.
        </p>
        <p>
          <b>Generative</b> means each plant is{" "}
          <TextLink to="/tech" label="created by code" />. It is also different
          every time. You will never see the exact same garden twice.
        </p>
        <div {...center}>
          <FillButton
            to="/data"
            label="Learn more about the data"
            theme={theme}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ settings, theme }) => ({
  theme
});

export default connect(mapStateToProps)(AboutModal);
