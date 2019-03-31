import TypographyTemplate from "../templates/TypographyTemplate";

class GoalsSlide extends TypographyTemplate {
  constructor(props) {
    super(props);

    const title = "GOALS";
    this.state = { title };
  }
}

export default GoalsSlide;
