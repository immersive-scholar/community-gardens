import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { hideVisually } from "styles";
import {
  modalCover,
  modal,
  contentWrapper,
  modalClose,
  closeIcon,
  modalBody
} from "./styles";

class Modal extends PureComponent {
  static propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node
  };

  render() {
    const { open, children, onClose } = this.props;
    const arrayOfChildren = React.Children.toArray(children);

    if (!open) return null;

    return ReactDOM.createPortal(
      <aside {...modalCover}>
        <div {...modal}>
          <button
            {...modalClose}
            aria-label="Close Modal"
            onClick={() => onClose()}
          >
            <span {...hideVisually}>Close</span>
            <svg {...closeIcon} viewBox="0 0 40 40">
              <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </button>
          <div {...contentWrapper}>
            <div {...modalBody}>{arrayOfChildren}</div>
          </div>
        </div>
      </aside>,
      document.body
    );
  }
}

export default Modal;
