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
  componentWillMount() {
    document.body.addEventListener("keyup", e => this.keyHandler(e));
  }

  componentWillUnmount() {
    document.body.removeEventListener("keyup", e => this.keyHandler(e));
  }

  keyHandler(e) {
    switch (e.key) {
      case "r":
        window.location.reload();
        break;
      case "ArrowRight":
        this.props.next();
        break;
      case "ArrowLeft":
        this.props.prev();
        break;
      default:
        console.log(e);
        break;
    }
  }

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
