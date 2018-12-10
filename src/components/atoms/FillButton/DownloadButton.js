import React, { PureComponent } from "react";
import { css } from "glamor";

import { fillButton, link, shadowless } from "styles";

const download = require("downloadjs");

export default class DownloadButton extends PureComponent {
  render() {
    const {
      label,
      theme: { colors },
      path
    } = this.props;
    return (
      <a
        {...fillButton}
        {...link}
        {...shadowless}
        {...css(
          colors && {
            color: colors.button.text,
            background: colors.button.bg,
            transition: "all 0.2s"
          }
        )}
        {...css(
          colors && {
            "&:hover": {
              textDecoration: "none",
              color: colors.button.hover.text,
              background: colors.button.hover.bg
            }
          }
        )}
        target="_blank"
        rel="nofollow noopener noreferrer"
        onClick={() => download(path)}
      >
        {label}
      </a>
    );
  }
}
