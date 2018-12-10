import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { smile } from "react-icons-kit/icomoon/smile";
import { Icon } from "react-icons-kit";

import FillButton from "components/atoms/FillButton";
import TextLink from "components/atoms/TextLink";
import Image from "components/atoms/Image";
import Animated from "components/molecules/Animated";
import PathToPicture from "util/PathToPicture";
import Newsletter from "components/organisms/Newsletter";
import Footer from "components/organisms/Footer";

import { textContainer } from "styles";

class Solutions extends PureComponent {
  componentWillMount() {
    const headerImage = PathToPicture("headers", `solutions`);
    this.setState({ headerImage });
  }

  render() {
    const { headerImage } = this.state;
    const { theme } = this.props;

    return (
      <div>
        <Image ratio="16x9" sources={headerImage} />
        <div {...textContainer}>
          <Helmet
            title="Community Gardens Solutions"
            description="How to be a part of the solution for food and housing insecurity."
          />
          <Animated as="h1">Solutions</Animated>
          <Animated>
            Whether you are a student, a faculty member, or someone who simply
            has a heart and wants all students to have the support they need to
            thrive, there are ways you can help.
          </Animated>
          <Animated as="h2">Students</Animated>
          <Animated>
            If you are a student, there is a good chance you know someone
            affected by food or housing insecurity. Try to find things to do
            that don't cost money. Share food. Be kind. Proactively offer that
            couch or that extra room if you know campus is closed during a
            holiday.{" "}
          </Animated>
          <Animated>
            Then get involved! There is a student coaltion that is crafting
            policy change. Show up, get pissed, and create positive change!
          </Animated>
          <Animated>
            <FillButton
              to="https://www.facebook.com/groups/184819805787255/"
              label="Join the coalition"
              theme={theme}
            />
          </Animated>
          <Animated as="h2">Faculty</Animated>
          <Animated>
            Faculty members need support too! Reach out to{" "}
            <TextLink
              label="Sarah Wright"
              href="https://trio.dasa.ncsu.edu/student-support-services/about/our-staff/"
            />{" "}
            who runs the Trio program and find out how you can help raise
            awareness about the issues of food and housing insecurity.
          </Animated>
          <Animated>
            <FillButton
              to="https://trio.dasa.ncsu.edu/student-support-services/"
              label="Support Services"
              theme={theme}
            />
          </Animated>
          <Animated as="h2">General Public</Animated>
          <Animated>
            Most importantly, remember to check your biases. Houseless can
            affect anyone, including students at a prestigious college in a
            growing city.
          </Animated>
          <Animated>
            Learn to look a little closer at the people around you. You might
            find that your ideas of what a homeless person looks like doesn't
            match reality.
          </Animated>
          <Animated>
            These students did not gamble away their fortune. They did not make
            bad decisions. They are in a situation not of their own creation and
            are fighting to rise above it.
          </Animated>
          <Animated>
            Together, we can help everyone succeed and thrive.
          </Animated>
          <Animated as="div">
            <Icon size={48} icon={smile} />
          </Animated>
        </div>

        <Newsletter />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ settings, theme }) => ({
  theme
});

export default connect(mapStateToProps)(Solutions);
