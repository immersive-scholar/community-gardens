import TypographyTemplate from "../templates/TypographyTemplate";

class DefinitionSlide extends TypographyTemplate {
  constructor(props) {
    super(props);

    const title = "DEFINITION";
    const index = 1;
    this.state = { title, index };
  }
}

export default DefinitionSlide;
