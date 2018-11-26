import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import { shadowless, link, button } from "styles";
export default class TextLink extends PureComponent {
  render() {
    const { href, label, to } = this.props;
    if (href) {
      return (
        <a
          {...shadowless}
          {...link}
          {...button}
          target="_blank"
          rel="nofollow noopener noreferrer"
          href={href}
        >
          {label}
        </a>
      );
    } else {
      return (
        <Link {...shadowless} {...link} {...button} to={to}>
          {label}
        </Link>
      );
    }
  }
}
