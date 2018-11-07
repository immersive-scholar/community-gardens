import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import get from "lodash/get";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { arrowRight } from "react-icons-kit/icomoon/arrowRight";
import { arrowLeft } from "react-icons-kit/icomoon/arrowLeft";

import { slides } from "actions";
import { getSelectedSlide } from "reducers";

// import { removePaddingVertical, lightText, shadowless } from "styles";
import { SlideControllerDiv } from "./styles";

class SlideController extends PureComponent {
  onPlaybackChange = p => {
    this.props.setPlaying(p);
  };

  toggleOptions = () => {
    const { optionsOpen } = this.props;
    this.props.setOptionsOpen(!optionsOpen);
  };

  render() {
    return (
      <SlideControllerDiv>
        <div
          onClick={() => this.props.prev()}
          style={{ color: "#ffffff", display: "inlineBlock" }}
        >
          <Icon size={24} icon={arrowLeft} />
        </div>
        <div
          onClick={() => this.props.next()}
          style={{ color: "#ffffff", display: "inlineBlock" }}
        >
          <Icon size={24} icon={arrowRight} />
        </div>
      </SlideControllerDiv>
    );
  }
}

const mapStateToProps = state => {
  const { slides } = state;
  return {
    selectedID: slides.selectedID,
    selectedSlide: getSelectedSlide(state)
  };
};

const mapDispatchToProps = dispatch => ({
  next: bindActionCreators(slides.next, dispatch),
  prev: bindActionCreators(slides.prev, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SlideController);
