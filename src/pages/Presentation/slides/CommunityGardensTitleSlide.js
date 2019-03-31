import TypographyTemplate from "../templates/TypographyTemplate";

class CommunityGardensTitleSlide extends TypographyTemplate {
  constructor(props) {
    super(props);

    const title = "CASE STUDY";
    const index = 4;
    this.state = { title, index };
  }
}

export default CommunityGardensTitleSlide;
