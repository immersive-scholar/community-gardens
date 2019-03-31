import TypographyTemplate from "../templates/TypographyTemplate";

class ProcessingSlide extends TypographyTemplate {
  constructor(props) {
    super(props);

    const title = "PROCESSING";
    this.state = { title };
  }
}

export default ProcessingSlide;
