import TypographyTemplate from "../templates/TypographyTemplate";

class NoControlSlide extends TypographyTemplate {
  constructor(props) {
    super(props);

    const title = "NO CONTROL";
    this.state = { title };
  }
}

export default NoControlSlide;
