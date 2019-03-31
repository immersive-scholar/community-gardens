import TypographyTemplate from "../templates/TypographyTemplate";

class GenerativeSlide extends TypographyTemplate {
  constructor(props) {
    super(props);

    const title = "GENERATIVE";
    this.state = { title };
  }
}

export default GenerativeSlide;
