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
  copyAfter,
  header,
  headerAfter
} from "./styles";
import { fillButton, hideOnSm, link } from "styles";

const ImageBlock = ({ item, theme, side }) => (
  <div
    {...image}
    {...css(side === "left" ? left : right)}
    {...css(item.video ? { width: "100%" } : {})}
  >
    {item.video ? (
      <Video videoId={item.video} sources={item.headerImage} />
    ) : (
      <Image sources={item.headerImage} theme={theme} />
    )}
  </div>
);

const CopyBlock = ({ item, theme, side, showAllOnSmall, isInViewport }) => {
  return (
    <div
      {...copy}
      {...css(item.video ? copyAfter : {})}
      {...css(side === "right" ? right : left)}
    >
      <AnimationWrapper
        as="span"
        inProp={isInViewport}
        transitionName="slideIn"
        delay={250}
        once
      >
        <h2 {...header} {...css(item.video ? headerAfter : {})}>
          {item.title}
        </h2>
      </AnimationWrapper>
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
                "@media(min-width: 48em)": {
                  color: theme.colors[0],
                  background: theme.colors[1],
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
                  background: theme.colors[2]
                }
              }
          )}
          {...hideOnSm}
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
  isInViewport
}) => (
  <div {...itemStyles} data-component="ImageCopyBlock">
    <ImageBlock item={item} theme={theme} side="left" />
    <CopyBlock
      item={item}
      theme={theme}
      side="right"
      showAllOnSmall={showAllOnSmall}
      {...isInViewport}
    />
  </div>
);

export const CopyImageBlock = ({
  item,
  theme,
  showAllOnSmall = false,
  isInViewport
}) => (
  <div {...itemStyles} data-component="CopyImageBlock">
    <CopyBlock item={item} theme={theme} side="left" {...isInViewport} />
    <ImageBlock
      item={item}
      theme={theme}
      side="right"
      showAllOnSmall={showAllOnSmall}
    />
  </div>
);
