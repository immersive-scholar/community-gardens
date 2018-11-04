import { css } from "glamor";
import typography from "util/typography";

// GLOBAL css rules
const textContainer = css({
  width: "100%",
  maxWidth: "40rem",
  margin: "0 auto",
  padding: "4rem 2rem",
  textAlign: "left"
});

const wideContainer = css({
  width: "100%",
  maxWidth: "80rem",
  margin: "0 auto",
  padding: "4rem 2rem",
  textAlign: "left"
});

const removePaddingVertical = css({
  paddingTop: 0,
  paddingBottom: 0
});

const removePaddingTop = css({
  paddingTop: 0
});

const removePaddingBottom = css({
  paddingBottom: 0
});

const removeMarginBottom = css({
  marginBottom: 0
});

const removeMarginVertical = css({
  marginBottom: 0
});

const center = css({
  textAlign: "center",
  margin: "0 auto"
});

const link = css({
  "&:hover": {
    textDecoration: "underline"
  }
});

const button = css({
  "&:hover": {
    cursor: "pointer"
  }
});

const shadowless = css({
  backgroundImage: "none",
  textShadow: "none"
});

const fillButton = css({
  padding: `${typography.rhythm(0.5)} ${typography.rhythm(1)}`,
  "&:hover": {
    cursor: "pointer"
  }
});

const hideOnSm = css({
  "@media(max-width: 47.997em)": {
    display: "none"
  }
});

const hideOnLg = css({
  "@media(min-width: 48em)": {
    display: "none"
  }
});

const wrapper = css({
  display: "flex",
  flexFlow: "wrap"
});

const fullWidth = css({
  flex: "1 0 100%"
});

const halfWidth = css({
  flex: "1 0 100%",
  "@media(min-width: 48em)": {
    flex: "1 0 50%"
  }
});

const thirdWidth = css({
  flex: "1 0 33.333%"
});

const quarterWidth = css({
  flex: "1 0 25%"
});

const fullWidthSm = css({
  "@media(max-width: 48em)": {
    flex: "1 0 100%"
  }
});

const imageWrapper = css({
  marginBottom: typography.rhythm(1.5)
});

const bulletless = css({
  listStyleType: "none"
});

export {
  textContainer,
  wideContainer,
  removePaddingVertical,
  removePaddingTop,
  removePaddingBottom,
  removeMarginBottom,
  removeMarginVertical,
  center,
  link,
  shadowless,
  button,
  fillButton,
  hideOnSm,
  hideOnLg,
  wrapper,
  fullWidth,
  halfWidth,
  thirdWidth,
  quarterWidth,
  fullWidthSm,
  imageWrapper,
  bulletless
};
