import TypographyTemplate from "../templates/TypographyTemplate";

class MeSlide extends TypographyTemplate {
  constructor(props) {
    super(props);

    const title = "GENERATIVE";
    this.state = { title };
  }
}

export default MeSlide;
