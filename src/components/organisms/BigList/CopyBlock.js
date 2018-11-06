import React from "react";
import { Link } from "react-router-dom";
import { css } from "glamor";
import { Watch } from "scrollmonitor-react";

import AnimationWrapper from "components/molecules/AnimationWrapper";

import { linkStyles, left, right, copy, header } from "./styles";
import { fillButton } from "../../styles";
import { hideOnSm, link } from "../../styles";

const CopyBlock = ({ item, theme, side, isInViewport }) => {
  return (
    <div {...copy} {...css(side === "right" ? right : left)}>
      <AnimationWrapper
        inProp={isInViewport}
        transitionName="slideUp"
        delay={150}
        once
      >
        {item.link ? (
          <Link {...linkStyles} to={item.link}>
            <h3 {...header}>{item.title}</h3>
          </Link>
        ) : (
          <h3 {...header}>{item.title}</h3>
        )}
      </AnimationWrapper>
      <AnimationWrapper
        inProp={isInViewport}
        transitionName="slideUp"
        delay={250}
        once
      >
        <p {...hideOnSm}>{item.excerpt}</p>
      </AnimationWrapper>
      <AnimationWrapper
        inProp={isInViewport}
        transitionName="slideUp"
        delay={350}
        once
      >
        {item.cta && (
          <Link
            {...fillButton}
            {...link}
            {...linkStyles}
            {...css(
              theme &&
                theme.colors && {
                  "@media(min-width: 48em)": {
                    color: "#fff",
                    background: theme.colors[0],
                    transition: "all 0.2s"
                  }
                }
            )}
            {...css(
              theme &&
                theme.colors && {
                  "&:hover": {
                    textDecoration: "none",
                    color: "#fff",
                    background: theme.colors[1]
                  }
                }
            )}
            {...hideOnSm}
            to={item.link}
          >
            {item.cta}
          </Link>
        )}
      </AnimationWrapper>
    </div>
  );
};

export default Watch(CopyBlock);
