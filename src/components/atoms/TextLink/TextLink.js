import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import { shadowless, link, button } from "styles";
export default class TextLink extends PureComponent {
  render() {
    const { href, label, to, children, ...otherProps } = this.props;
    const arrayOfChildren = React.Children.toArray(children);

    if (href) {
      return (
        <a
          {...shadowless}
          {...link}
          {...button}
          {...otherProps}
          target="_blank"
          rel="nofollow noopener noreferrer"
          href={href}
        >
          {label ? label : arrayOfChildren}
        </a>
      );
    } else {
      return (
        <Link {...shadowless} {...link} {...button} to={to} {...otherProps}>
          {label}
        </Link>
      );
    }
  }
}
