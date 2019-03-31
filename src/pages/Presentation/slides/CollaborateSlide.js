import TypographyTemplate from "../templates/TypographyTemplate";

class Collaboration extends TypographyTemplate {
  constructor(props) {
    super(props);

    const title = "COLLABORATE";
    this.state = { title };
  }
}

export default Collaboration;
