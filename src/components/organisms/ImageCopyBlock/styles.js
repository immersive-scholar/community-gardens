import { css } from "glamor";
import typography from "util/typography";

// const image = css({
//   width: '100%',
// });

const itemStyles = css({
  display: "flex",
  flexFlow: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  width: "100%",
  margin: `0 0 ${typography.rhythm(2)}`,
  "@media(min-width: 48em)": {
    flexFlow: "row"
  }
});

const backgroundImageStyles = css({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "red",
  backgroundSize: "cover",
  backgroundPosition: "center"
});

const linkStyles = css({
  color: "rgba(0, 0, 0, 0.8)",
  backgroundImage: "none",
  textShadow: "none",
  "@media(max-width: 48em)": {
    color: "white"
  }
});

const image = css({
  flex: "1 0 60%",
  margin: 0,
  "@media(max-width: 48em)": {
    flex: "1 0 100%"
  }
});

const left = css({
  order: 1
});

const right = css({
  order: 2
});

const copy = css({
  flex: "0 0 40%",
  position: "relative",
  padding: typography.rhythm(2),
  paddingRight: typography.rhythm(1),
  "@media(max-width: 48em)": {
    position: "absolute",
    flex: "1 0 100%",
    order: 3,
    margin: 0,
    padding: "2rem 4rem",
    color: "inherit",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    zIndex: 1
  }
});

const copyAfter = {
  "@media(max-width: 48em)": {
    position: "relative",
    border: "none"
  }
};

const header = css({
  marginTop: 0,
  "@media(max-width: 48em)": {
    color: "white"
  }
});

const headerAfter = {
  "@media(max-width: 48em)": {
    color: "rgba(0, 0, 0, 0.8)"
  }
};

const absolute = css({
  position: "absolute",
  top: "-50%",
  left: "-50%",
  translate: "transform(-50%)"
});

export {
  image,
  left,
  right,
  itemStyles,
  backgroundImageStyles,
  linkStyles,
  copy,
  copyAfter,
  header,
  headerAfter,
  absolute
};
