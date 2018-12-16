import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { css } from "glamor";

import { fillButton, link, shadowless } from "styles";

export default class FillButton extends PureComponent {
  render() {
    const {
      label,
      to,
      theme: { colors },
      href
    } = this.props;
    if (href) {
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
          href={href}
        >
          {label}
        </a>
      );
    } else {
      return (
        <Link
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
          to={to}
        >
          {label}
        </Link>
      );
    }
  }
}
