import React, { PureComponent, Fragment } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { chapters } from "actions";
import Image from "components/atoms/Image";
import Animated from "components/molecules/Animated";
import {
  ImageCopyBlock,
  CopyImageBlock
} from "components/organisms/ImageCopyBlock";
import PathToPicture from "util/PathToPicture";

import { textContainer, wideContainer } from "styles";

class Data extends PureComponent {
  componentWillMount() {
    const headerImage = PathToPicture("headers", `community-gardens-data`);

    this.setState({ headerImage });
  }

  render() {
    const { headerImage } = this.state;

    const { chapters } = this.props;
    const summer = chapters.summerGarden;
    const housingInsecurity = chapters.housingInsecurity;
    const highResources = chapters.resourced;
    const energyOutgoing = chapters.energyOutgoing;

    const theme = {
      baseColor: "#fbb3d1",
      colors: ["#ec468a", "#fbb3d1", "#ffffff", "#c25482"]
    };

    return (
      <div>
        <Image ratio="16x9" sources={headerImage} />
        <div {...textContainer}>
          <Helmet
            title="Community Gardens Data Summary"
            description="Details about how the data affects the plants in Community Gardens."
          />
          <Animated as="h1">Data-driven</Animated>
          <Animated>
            Combining data-driven design and generative art is not immediately
            obvious.
          </Animated>
          <Animated>
            Data-driven design means using real data to inform decisions.
            Community Gardens started as a survey of students at NC State. This
            same data became a spreadsheet and is now used to generate plants.
          </Animated>
          <Animated>
            The data is very rich. Details range from numeric (age, number of
            years in school, degree obtained, how many hours a week they work)
            to behavioral (how the student pays for tuition, are they out of
            state, are they First Generation) to experiential (did they sleep
            outside, did they skip meals). There are many ways to affect the
            plant's appearance.
          </Animated>
          <Animated as="h2">Formula</Animated>
          <Animated>
            The most important data to derive is the overall health factor of
            the plant. This is derived by the formula
          </Animated>
          <Animated>
            <i>
              Resources Incoming - Energy Outgoing + Community Support -
              Emotional Health = Health
            </i>
          </Animated>
          <Animated>
            For example, if a student has their tuition paid for, they have a
            high Resources Incoming score. If a student is working 40
            hours/week, they have a high Energy Outgoing Score. High Community
            Support scorers are having some of their needs met by programs like
            the NC State Food Pantry or the emergency fund. Students who
            reported high levels of anxiety have low emotional health. Each of
            these categories is an aggregate of between 3 and 10 responses from
            the survey.
          </Animated>
          <Animated as="h2">Plant Metaphors</Animated>
          <Animated>
            Once we have found meaning within each student's data, associating
            visual characteristics is the next step. The complete list is as
            follows:
          </Animated>
        </div>
        <div {...wideContainer}>
          <ImageCopyBlock
            item={summer}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
          />
          <CopyImageBlock
            item={housingInsecurity}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
          />
          <ImageCopyBlock
            item={highResources}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
          />
          <CopyImageBlock
            item={energyOutgoing}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
          />
        </div>{" "}
        <div {...textContainer}>
          <Animated>
            <b>First Generation</b> students have mazes on their stems. They
            have an extra layer of challenges to navigate, often without guides
            or support.
          </Animated>
          <Animated>
            The <b>Degree</b> the student is pursing determines the plant
            height: taller plants are more senior degrees.
          </Animated>
          <Animated>
            The <b>age</b> of the student determines how many leaves or petals
            are present
          </Animated>
          <Animated>
            Students who indicate <b>high anxiety</b> are drawn with angular
            lines. Smooth, elegant lines are used for other students
          </Animated>
          <Animated>
            Students with a <b>high GPA</b> are drawn with white leaves.
          </Animated>
          <Animated>
            Students who come from <b>out of state</b> have leaves with
            topographical maps drawn on them.
          </Animated>
          <Animated>
            Students who experience <b>food insecurity</b> have berries drawn as
            wireframes. The berries are present but hollow.
          </Animated>
          <Animated as="h2">Generating Art</Animated>
          <Animated>
            Each plant is a mathematical equation that outputs a 3D model.
            Depending on the data fed to the plant, the output changes
            accordingly. Creating groups of plants based on similar
            characteristics results in gardens that tell stories about the data.
            For instance, if you visit the Garden of Students Who Experience
            Housing Insecurity, you will notice that many of the plants have
            mazes on their leaves. This represents First Generation students,
            and viewers begin to connect information in a new way.
          </Animated>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ chapters }) => ({
  chapters: chapters.node
});

const mapDispatchToProps = dispatch => ({
  focusChapter: bindActionCreators(chapters.focusChapter, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Data);
