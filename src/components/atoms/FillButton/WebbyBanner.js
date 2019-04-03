import React, { PureComponent } from "react";
import { css } from "glamor";

import { shadowless } from "styles";

export default class WebbyBanner extends PureComponent {
  render() {
    const background = this.props.background || "#ec468a";
    return (
      <div
        {...css({
          background,
          padding: "1rem 4rem 1rem 1rem",
          color: "#ffffff",
          "@media screen and (min-width: 72em)": {
            textAlign: "center",
            padding: "1.5rem 4rem",
          },
        })}
      >
        <b>
          Community Gardens has been nominated for a Webby! Please{" "}
          <a
            {...shadowless}
            {...css({ color: "#fff", textDecoration: "underline" })}
            target="_blank"
            rel="nofollow noopener noreferrer"
            href="https://vote.webbyawards.com/PublicVoting#/2019/websites/general-websites/netart"
          >
            vote for me
          </a>!
        </b>
      </div>
    );
  }
}
