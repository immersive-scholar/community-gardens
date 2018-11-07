import React, { PureComponent, Fragment } from "react";
import { css } from "glamor";

import Image from "components/atoms/Image";
import Logo from "components/atoms/Logo";

import { removeMarginBottom, shadowless, link } from "styles";
import { SidebarDiv, Title, P } from "./styles";

const QRCode = require("qrcode.react");

class Sidebar extends PureComponent {
  componentWillMount() {
    const image = [
      {
        srcSet: require(`assets/logos/community-gardens-logo.png`)
      }
    ];
    this.setState({ image });
  }
  render() {
    const { image } = this.state;

    return (
      <SidebarDiv>
        <Logo />
        <Title>Community Gardens</Title>
        <P>
          A data-driven generative art installation about food and housing
          insecurity at NC State.
        </P>
        <P>
          Each plant represents a student. The plant's size, shape, species,
          leaves, and other characteristics are all driven by the data.
        </P>
        <P {...css({ marginBottom: "60px" })}>
          Go to{" "}
          <a
            {...shadowless}
            {...link}
            target="_blank"
            rel="nofollow noopener noreferrer"
            href="https://psychology.chass.ncsu.edu/faculty_staff/mehasket"
          >
            communitygardens.generativeartist.com
          </a>{" "}
          to learn more about how the data is used, the impact of food and
          housing insecurity, and solutions.
        </P>
        <div
          {...css({
            alignSelf: "center",
            marginBottom: "24px"
          })}
        >
          <QRCode value="https://communitygardens.generativeartist.com/" />,
        </div>
        <P {...css({ alignSelf: "center" })}>Let's do better.</P>
      </SidebarDiv>
    );
  }
}

export default Sidebar;
