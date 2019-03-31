import TypographyTemplate from "../templates/TypographyTemplate";

class GenerativeSlide extends TypographyTemplate {
  constructor(props) {
    super(props);

    const titles = ["input", "equation", "output"];
    this.state = { titles };
  }
}

export default GenerativeSlide;
