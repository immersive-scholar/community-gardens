import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { css } from "glamor";

import { fillButton, link, shadowless } from "styles";

export default class FillButton extends PureComponent {
  render() {
    const { label, to, theme, href } = this.props;
    if (href) {
      return (
        <a
          {...fillButton}
          {...link}
          {...shadowless}
          {...css(
            theme &&
              theme.colors && {
                color: theme.colors[0],
                background: theme.colors[1],
                transition: "all 0.2s"
              }
          )}
          {...css(
            theme &&
              theme.colors && {
                "&:hover": {
                  textDecoration: "none",
                  color: theme.colors[2],
                  background: theme.colors[3]
                }
              }
          )}
          href={href}
        >
          {label}
        </a>
      );
    }
    return (
      <Link
        {...fillButton}
        {...link}
        {...shadowless}
        {...css(
          theme &&
            theme.colors && {
              color: theme.colors[0],
              background: theme.colors[1],
              transition: "all 0.2s"
            }
        )}
        {...css(
          theme &&
            theme.colors && {
              "&:hover": {
                textDecoration: "none",
                color: theme.colors[2],
                background: theme.colors[3]
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
