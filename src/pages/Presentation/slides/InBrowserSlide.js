import TypographyTemplate from "../templates/TypographyTemplate";

class InBrowserSlide extends TypographyTemplate {
  constructor(props) {
    super(props);

    const title = "IN BROWSER";
    this.state = { title };
  }
}

export default InBrowserSlide;
