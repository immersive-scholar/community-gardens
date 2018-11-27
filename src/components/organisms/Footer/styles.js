import glamorous from "glamorous";
import { css } from "glamor";

const Logo = glamorous.div({
  margin: "0 auto",
  background: "#ffffff"
});

const links = css({
  gridTemplateAreas: `
  'about gardens credits'
  'data solutions contact'
  'tech tech social'`,
  "@media(max-width: 48em)": {
    gridTemplateAreas: `
      'about credits'
      'gardens contact'
      'data social'
      'solutions solutions' 
      'tech tech'`
  }
});

export { Logo, links };
