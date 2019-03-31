import shuffle from "lodash/shuffle";

import ImageTransitionTemplate from "../templates/ImageTransitionTemplate";

class IntroSlide extends ImageTransitionTemplate {
  componentWillMount() {
    const backgroundFilenames = [
      "hr-1541474916803-2048x2048",
      "hr-1541474986837-2048x2048",
      "hr-1541475258969-2048x2048",
      "hr-1541475347108-2048x2048",
      "hr-1541475561202-2048x2048",
      "hr-1541475664041-2048x2048",
      "hr-1541476768539-2048x2048",
      "hr-1541477034736-2048x2048",
      "hr-1541478064355-2048x2048",
      "hr-1541478160164-2048x2048",
      "hr-1541478795951-2048x2048",
      "hr-1541519404405-2048x2048",
      "hr-1541519465781-2048x2048",
      "hr-1541526484189-2048x2048",
    ];

    let backgrounds = backgroundFilenames.map(filename => [
      {
        srcSet: require(`assets/backgrounds/community-gardens/${filename}.png`),
      },
    ]);

    const shuffledBackground = shuffle(backgrounds);

    this.setState({ backgrounds: shuffledBackground }, () =>
      this.animateIn({ delay: 1 })
    );
    // this.setState({ backgrounds, order });
  }
}

export default IntroSlide;
