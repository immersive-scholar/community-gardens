import TypographyTemplate from "../templates/TypographyTemplate";

class HistoryTitleSlide extends TypographyTemplate {
  constructor(props) {
    super(props);

    const title = "HISTORY";
    const index = 2;
    this.state = { title, index };
  }
}

export default HistoryTitleSlide;
