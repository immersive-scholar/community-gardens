import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import map from "lodash/map";

import { css } from "glamor";
import typography from "util/typography";

// import logo from '../../assets/logos/lucastswick-logo-black.svg';

import { shadowless } from "styles";

let styles = {
  bmBurgerButton: {
    position: "fixed",
    width: typography.rhythm(1),
    height: typography.rhythm(1),
    right: typography.rhythm(1),
    top: typography.rhythm(1)
  },
  bmBurgerBars: {
    background: "#373a47"
  },
  bmCrossButton: {
    height: typography.rhythm(1),
    width: typography.rhythm(1)
  },
  bmCross: {
    background: "#bdc3c7"
  },
  bmMenu: {
    background: "#373a47",
    padding: `${typography.rhythm(0.5)} ${typography.rhythm(0.5)}`
  },
  bmMorphShape: {
    fill: "#373a47"
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: typography.rhythm(1)
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.2)"
  }
};

class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    if (!this.props.showBurgerButton) return null;

    const { colors } = this.props;

    const buttonStyle = css({
      color: colors.topNav.text,
      "&:hover": {
        color: colors.topNav.hover.text
      }
    });

    const pages = [
      { title: "Home", uid: "home", link: "/" },
      { title: "Gardens", uid: "gardens", link: "/gardens" },
      { title: "Gallery", uid: "gallery", link: "/gallery" },
      { title: "About", uid: "about", link: "/about" },
      { title: "Data", uid: "data", link: "/data" },
      { title: "Tech", uid: "tech", link: "/tech" },
      { title: "Solutions", uid: "solutions", link: "/solutions" }
    ];

    return (
      <Menu
        isOpen={this.state.menuOpen}
        onStateChange={state => this.handleStateChange(state)}
        right
        styles={styles}
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
      >
        {map(pages, page => {
          return (
            <Link
              onClick={() => this.closeMenu()}
              key={page.uid}
              {...shadowless}
              to={page.link}
              {...buttonStyle}
            >
              {page.title}
            </Link>
          );
        })}
        <br />

        <Link
          onClick={() => this.closeMenu()}
          className="menu-item"
          {...shadowless}
          {...buttonStyle}
          to="/contact"
        >
          Contact
        </Link>
        <Link
          onClick={() => this.closeMenu()}
          className="menu-item"
          {...shadowless}
          {...buttonStyle}
          to="/credits"
        >
          Credits
        </Link>
      </Menu>
    );
  }
}

const mapStateToProps = ({ settings, theme }) => ({
  showBurgerButton: settings.showBurgerButton,
  colors: theme.colors
});

export default connect(mapStateToProps)(TopNav);
