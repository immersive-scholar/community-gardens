import TypographyTemplate from "../templates/TypographyTemplate";

class PersonalHistoryTitleSlide extends TypographyTemplate {
  constructor(props) {
    super(props);

    const title = "MY HISTORY";
    const index = 3;
    this.state = { title, index };
  }
}

export default PersonalHistoryTitleSlide;
