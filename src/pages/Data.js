import React, { PureComponent } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { chapters } from "actions";
import Image from "components/atoms/Image";
import FillButton from "components/atoms/FillButton";
import Animated from "components/molecules/Animated";
import {
  ImageCopyBlock,
  CopyImageBlock
} from "components/organisms/ImageCopyBlock";
import PathToPicture from "util/PathToPicture";
import Newsletter from "components/organisms/Newsletter";
import Footer from "components/organisms/Footer";

import { textContainer, removePaddingTop, lead } from "styles";

class Data extends PureComponent {
  componentWillMount() {
    const headerImage = PathToPicture("headers", `community-gardens-data`);
    this.setState({ headerImage });
  }

  render() {
    const { headerImage } = this.state;

    const { chapters } = this.props;
    const age = chapters.age;
    const anxiety = chapters.anxiety;
    const degree = chapters.degree;
    const energyOutgoing = chapters.energyOutgoing;
    const firstGeneration = chapters.firstGeneration;
    const foodInsecurity = chapters.foodInsecurity;
    const highResources = chapters.resourced;
    const highGPA = chapters.highGpa;
    const housingInsecurity = chapters.housingInsecurity;
    const outOfState = chapters.outOfState;
    const summerGarden = chapters.summerGarden;
    const winterGarden = chapters.winterGarden;

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
          <Animated as="h1">Data-driven Generative Art</Animated>
          <Animated {...lead}>
            Combining data-driven design and generative art is not immediately
            obvious.
          </Animated>
          <Animated>
            Data-driven design means using real data to inform decisions.
            Community Gardens began as a survey of students at NC State. The
            data is now used to generate plants.
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
        <div {...textContainer} {...removePaddingTop}>
          <ImageCopyBlock
            item={{ ...summerGarden, title: "High Support" }}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
            smallImage={true}
          />
          <CopyImageBlock
            item={{ ...winterGarden, title: "Low Support" }}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
            smallImage={true}
          />
          <ImageCopyBlock
            item={highResources}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
            smallImage={true}
          />
          <CopyImageBlock
            item={energyOutgoing}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
            smallImage={true}
          />
          <ImageCopyBlock
            item={firstGeneration}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
            smallImage={true}
          />
          <CopyImageBlock
            item={housingInsecurity}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
            smallImage={true}
          />
          <ImageCopyBlock
            item={foodInsecurity}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
            smallImage={true}
          />
          <CopyImageBlock
            item={highGPA}
            showAllOnSmall
            showLinkOnSmall
            mask="circle"
            theme={theme}
            smallImage={true}
          />
          <ImageCopyBlock
            item={degree}
            showAllOnSmall
            mask="circle"
            theme={theme}
            smallImage={true}
          />
          <CopyImageBlock
            item={age}
            showAllOnSmall
            mask="circle"
            theme={theme}
            smallImage={true}
          />
          <ImageCopyBlock
            item={anxiety}
            showAllOnSmall
            mask="circle"
            theme={theme}
            smallImage={true}
          />
          <CopyImageBlock
            item={outOfState}
            showAllOnSmall
            mask="circle"
            theme={theme}
            smallImage={true}
          />
          <Animated as="h2">Aggregate Data</Animated>
          <Animated>
            As viewers learn how to 'read' the attributes of the plants,
            connections are made. For instance, the Garden of Housing Insecurity
            has many mazes on the leaves. This is because there is a
            disproportionate number of First Generation students who experience
            Housing Insecurity.
          </Animated>
          <Animated as="h2">Generating Art</Animated>
          <Animated>
            Each plant is a mathematical equation that outputs a 3D model.
            Depending on the data fed to the plant, the output changes
            accordingly. Creating groups of plants based on similar
            characteristics results in gardens that reveal meaning within the
            data.
          </Animated>
          <Animated>
            <FillButton
              to="/gardens"
              label="View all the gardens"
              theme={theme}
            />
          </Animated>
        </div>
        <Newsletter />
        <Footer />
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
