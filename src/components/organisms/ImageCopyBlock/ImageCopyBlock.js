import React from "react";
import { Link } from "react-router-dom";
import { css } from "glamor";

import AnimationWrapper from "components/molecules/AnimationWrapper";

import Image from "components/atoms/Image";
import Video from "components/atoms/Video";

import {
  itemStyles,
  linkStyles,
  image,
  left,
  right,
  copy,
  copyOverlayStyle,
  copyAfter,
  header,
  headerAfter
} from "./styles";
import { fillButton, hideOnSm, link, CircleMaskDiv } from "styles";

const ImageBlock = ({ item, theme, side, mask = "" }) => {
  const WrapperDiv = mask === "circle" ? CircleMaskDiv : "div";
  return (
    <WrapperDiv
      {...image}
      {...css(side === "left" ? left : right)}
      {...css(item.video ? { width: "100%" } : {})}
    >
      {item.video ? (
        <Video videoId={item.video} sources={item.headerImage} />
      ) : (
        <Image sources={item.headerImage} theme={theme} />
      )}
    </WrapperDiv>
  );
};

const CopyBlock = ({
  item,
  theme,
  side,
  showAllOnSmall,
  showLinkOnSmall,
  isInViewport,
  copyOverlay = false
}) => {
  return (
    <div
      {...(copyOverlay ? copyOverlayStyle : copy)}
      {...css(item.video ? copyAfter : {})}
      {...css(side === "right" ? right : left)}
    >
      <h2
        {...header}
        {...css(item.video ? headerAfter : {})}
        {...css({ minHeight: "1px" })}
        {...css(
          theme &&
            theme.colors && {
              color: theme.colors[0]
            }
        )}
      >
        {item.title}
      </h2>
      {showAllOnSmall ? (
        <p>{item.excerpt}</p>
      ) : (
        <p {...hideOnSm}>{item.excerpt}</p>
      )}
      {item.cta && (
        <Link
          {...fillButton}
          {...link}
          {...linkStyles}
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
          {...(showLinkOnSmall ? {} : hideOnSm)}
          to={item.link}
        >
          {item.cta}
        </Link>
      )}
    </div>
  );
};

export const ImageCopyBlock = ({
  item,
  theme,
  showAllOnSmall = false,
  showLinkOnSmall = false,
  isInViewport,
  mask = "",
  copyOverlay = false
}) => (
  <div {...itemStyles} data-component="ImageCopyBlock">
    <ImageBlock item={item} theme={theme} side="left" mask={mask} />
    <CopyBlock
      item={item}
      theme={theme}
      side="right"
      showAllOnSmall={showAllOnSmall}
      showLinkOnSmall={showLinkOnSmall}
      copyOverlay={copyOverlay}
      {...isInViewport}
    />
  </div>
);

export const CopyImageBlock = ({
  item,
  theme,
  showAllOnSmall = false,
  showLinkOnSmall = false,
  isInViewport,
  mask = "",
  copyOverlay = false
}) => (
  <div {...itemStyles} data-component="CopyImageBlock">
    <CopyBlock
      item={item}
      theme={theme}
      side="left"
      {...isInViewport}
      copyOverlay={copyOverlay}
      showAllOnSmall={showAllOnSmall}
      showLinkOnSmall={showLinkOnSmall}
    />
    <ImageBlock item={item} theme={theme} side="right" mask={mask} />
  </div>
);
