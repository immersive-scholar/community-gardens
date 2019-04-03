import React, { PureComponent } from "react";
import { css } from "glamor";

import { shadowless } from "styles";
// import webbyLogo from "assets/logos/Green_Nominee_2019.png";
import webbyLogo from "assets/logos/bug_00.png";

export default class WebbyLink extends PureComponent {
  render() {
    const { absolute } = this.props;
    return (
      <a
        {...shadowless}
        {...css(
          absolute
            ? {
                position: "absolute",
                top: "0.5rem",
                left: "0.5rem",
                width: "3rem",
                zIndex: 101,
                transform: "scale(1)",
                transition: "all 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                "@media screen and (min-width: 72em)": {
                  top: "1rem",
                  left: "1rem",
                  width: "8rem",
                },
              }
            : {
                position: "relative",
                margin: "0 auto",
                width: "4rem",
                transform: "scale(1)",
                transition: "all 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                "@media screen and (min-width: 72em)": {
                  width: "5rem",
                },
              }
        )}
        target="_blank"
        rel="nofollow noopener noreferrer"
        href="https://vote.webbyawards.com/PublicVoting#/2019/websites/general-websites/netart"
      >
        <img src={webbyLogo} alt="Vote for Community Gardens" />
      </a>
    );
  }
}
