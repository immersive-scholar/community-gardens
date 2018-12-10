import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { css } from "glamor";
import typography from "util/typography";
import Animated from "components/molecules/Animated";

import {
  newsletterWrapper,
  newsletterInner,
  columnsLarge,
  header,
  emailInput,
  details
} from "./styles";
import {
  textContainer,
  shadowless,
  removePaddingBottom,
  hideOnLg
} from "styles";

class Newsletter extends PureComponent {
  render() {
    const { theme } = this.props;

    const buttonStyle = css({
      color: theme.colors.pink,
      "&:hover": {
        color: theme.colors.pink,
        textDecoration: "underline"
      }
    });

    return (
      <div
        {...css({
          transition: "background 1s ease-out 0.5s",
          backgroundColor: theme.colors.dark
        })}
        {...newsletterWrapper}
      >
        <div {...textContainer} {...newsletterInner} {...removePaddingBottom}>
          <form
            style={{
              border: "1px, solid #ccc",
              padding: "3px",
              textAlign: "center"
            }}
            action="https://tinyletter.com/lucastswick"
            method="post"
            target="popupwindow"
            onSubmit={() => {
              window.open(
                "https://tinyletter.com/lucastswick",
                "popupwindow",
                "scrollbars=yes,width=800,height=600"
              );
              return true;
            }}
          >
            <Animated as="div">
              <h3 {...header} {...css({ color: theme.colors.pink })}>
                Community Gardens <br {...hideOnLg} />Mailing List
              </h3>
            </Animated>
            <Animated as="p" delay={50}>
              <label htmlFor="tlemail" {...css({ color: theme.colors.bright })}>
                Stay up to date with Community Gardens, new chapter releases,
                and ways you can help combat food and housing insecurity.
              </label>
            </Animated>
            <Animated as="div" delay={100}>
              <div {...columnsLarge}>
                <input {...emailInput} type="text" name="email" id="tlemail" />
                <input type="hidden" value="1" name="embed" />
                <input type="submit" value="Subscribe" />
              </div>
            </Animated>
            <Animated as="div" delay={150}>
              <p {...details}>
                <a
                  {...shadowless}
                  {...buttonStyle}
                  {...css({ marginTop: typography.rhythm(1.5) })}
                  href="https://tinyletter.com"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  powered by TinyLetter
                </a>
              </p>
            </Animated>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ theme }) => ({
  theme
});

export default connect(mapStateToProps)(Newsletter);
