import { css } from "glamor";
import typography from "util/typography";

const newsletterWrapper = css({
  float: "left",
  width: "100%"
});

const newsletterInner = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "top",
  justifyContent: "center",
  marginBottom: typography.rhythm(2.5),
  "@media(max-width: 48em)": {
    flexWrap: "wrap",
    textAlign: "center"
  }
});

const columnsLarge = css({
  display: "flex",
  alignItems: "top",
  justifyContent: "center",
  "@media(max-width: 48em)": {
    flexDirection: "column",
    flexWrap: "wrap",
    textAlign: "center",
    alignItems: "center"
  }
});

const details = css({
  fontSize: typography.rhythm(0.5),
  marginTop: typography.rhythm(2),
  "@media(max-width: 48em)": {
    marginTop: typography.rhythm(1)
  }
});

const emailInput = css({
  width: typography.rhythm(6),
  marginRight: typography.rhythm(0.5),
  "@media(max-width: 48em)": {
    margin: `0 0 ${typography.rhythm(0.5)}`
  }
});

const header = css({
  marginTop: 0
});

export {
  newsletterWrapper,
  newsletterInner,
  header,
  columnsLarge,
  details,
  emailInput
};
