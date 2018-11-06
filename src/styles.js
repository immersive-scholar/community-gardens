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

const lightText = css({
  color: "#ffffff"
});

const lightFocusedText = css({
  color: "#fe6442"
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

const underline = css({
  textDecoration: "underline"
});

const buttonStyle = css({
  display: "inline-block",
  background: "#e06b1c",
  color: "#ffffff",
  "&:hover": {
    background: "#e06b1c",
    color: "#ffffff",
    textDecoration: "underline"
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

const grid = css({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridColumnGap: "0.5rem",
  gridRowGap: "0.5rem"
});

const inlineBlock = css({
  display: "inline-block"
});

export {
  textContainer,
  lightText,
  lightFocusedText,
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
  buttonStyle,
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
  bulletless,
  grid,
  inlineBlock,
  underline
};
