import TypographyTemplate from "../templates/TypographyTemplate";

class DataDrivenSlide extends TypographyTemplate {
  constructor(props) {
    super(props);

    const title = "PLANTS";
    this.state = { title };
  }
}

export default DataDrivenSlide;
