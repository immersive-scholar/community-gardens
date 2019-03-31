import GridTemplate from "../templates/GridTemplate";

class HistoryTitleSlide extends GridTemplate {
  constructor(props) {
    super(props);

    const history = [];
    history.push([
      {
        srcSet: require(`assets/presentation/george-nees.jpg`),
      },
    ]);

    history.push([
      {
        srcSet: require(`assets/presentation/vera-molnar-1974.jpg`),
      },
    ]);

    history.push([
      {
        srcSet: require(`assets/presentation/john-maeda-1990.jpg`),
      },
    ]);

    const captions = [
      "George Nees, 1968",
      "Vera Molnar, 1974",
      "John Maeda, 1990",
    ];

    this.state = { backgrounds: history, captions };
  }
}

export default HistoryTitleSlide;
