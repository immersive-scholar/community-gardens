import React from "react";
import { Link } from "react-router-dom";
import { css } from "glamor";

import Image from "components/atoms/Image";
import Video from "components/atoms/Video";

import {
  itemStyles,
  linkStyles,
  image,
  imageSmall,
  hoverable,
  left,
  right,
  copy,
  copyLarge,
  copyOverlayStyle,
  copyAfter,
  header,
  headerAfter,
} from "./styles";
import { fillButton, hideOnSm, link, CircleMaskDiv } from "styles";

const ImageBlock = ({ item, theme, side, mask = "", smallImage = false }) => {
  const WrapperDiv = mask === "circle" ? CircleMaskDiv : "div";
  return (
    <WrapperDiv
      {...image}
      {...css(side === "left" ? left : right)}
      {...css(item.video ? { width: "100%" } : {})}
      {...css(smallImage ? imageSmall : {})}
      {...css(item.link ? hoverable : {})}
    >
      {item.link && (
        <Link to={item.link}>
          {item.video ? (
            <Video videoId={item.video} sources={item.headerImage} />
          ) : (
            <Image sources={item.headerImage} theme={theme} />
          )}
        </Link>
      )}
      {!item.link &&
        (item.video ? (
          <Video videoId={item.video} sources={item.headerImage} />
        ) : (
          <Image sources={item.headerImage} theme={theme} />
        ))}
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
  copyOverlay = false,
  smallImage = false,
}) => {
  return (
    <div
      {...(copyOverlay ? copyOverlayStyle : copy)}
      {...css(item.video ? copyAfter : {})}
      {...css(side === "right" ? right : left)}
      {...css(smallImage ? copyLarge : {})}
    >
      <h2
        {...header}
        {...css(item.video ? headerAfter : {})}
        {...css({ minHeight: "1px" })}
        {...css(
          theme &&
            theme.colors && {
              color: theme.colors.pink,
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
                color: theme.colors.button.text,
                background: theme.colors.button.bg,
                transition: "all 0.2s",
              }
          )}
          {...css(
            theme &&
              theme.colors && {
                "&:hover": {
                  textDecoration: "none",
                  color: theme.colors.button.hover.text,
                  background: theme.colors.button.hover.bg,
                },
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
  copyOverlay = false,
  smallImage = false,
}) => (
  <div {...itemStyles} data-component="ImageCopyBlock">
    <ImageBlock
      item={item}
      theme={theme}
      side="left"
      mask={mask}
      smallImage={smallImage}
    />
    <CopyBlock
      item={item}
      theme={theme}
      side="right"
      showAllOnSmall={showAllOnSmall}
      showLinkOnSmall={showLinkOnSmall}
      copyOverlay={copyOverlay}
      smallImage={smallImage}
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
  copyOverlay = false,
  smallImage = false,
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
      smallImage={smallImage}
    />
    <ImageBlock
      item={item}
      theme={theme}
      side="right"
      mask={mask}
      smallImage={smallImage}
    />
  </div>
);
