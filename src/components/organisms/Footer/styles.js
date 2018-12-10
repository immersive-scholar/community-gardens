import glamorous from "glamorous";
import { css } from "glamor";

const Logo = glamorous.div({
  margin: "0 auto",
  background: "#ffffff"
});

const links = css({
  gridTemplateAreas: `
  'gardens about credits'
  'gallery solutions contact'
  'tech data social'`,
  "@media(max-width: 48em)": {
    gridTemplateAreas: `
      'about gallery'
      'gardens credits'
      'data contact'
      'solutions social' 
      'tech tech'`
  }
});

export { Logo, links };
