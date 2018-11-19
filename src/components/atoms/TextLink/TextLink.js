import React, { PureComponent } from "react";

import { shadowless, link } from "styles";

export default class TextLink extends PureComponent {
  render() {
    const { href, label } = this.props;
    return (
      <a
        {...shadowless}
        {...link}
        target="_blank"
        rel="nofollow noopener noreferrer"
        href={href}
      >
        {label}
      </a>
    );
  }
}
