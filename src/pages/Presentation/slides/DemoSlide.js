import TypographyTemplate from "../templates/TypographyTemplate";

class DemoSlide extends TypographyTemplate {
  constructor(props) {
    super(props);

    const title = "STARTER BLOM";
    this.state = { title };
  }
}

export default DemoSlide;
