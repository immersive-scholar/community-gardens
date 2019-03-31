import React, { PureComponent } from "react";
import { css } from "glamor";
import map from "lodash/map";

import { TweenMax, Power2 } from "gsap";

import Image from "components/atoms/Image";

import {
  Center,
  LargeCircle,
  Background,
  blackBg,
} from "pages/Presentation/styles";

class ImageTransitionTemplate extends PureComponent {
  constructor(props) {
    super(props);

    this.opacity = 0;

    this.state = { currentImageIndex: 0 };

    this.faderRef = React.createRef();
  }

  componentWillUnmount() {
    this.tween && this.tween.kill(null, this);
    this.tween2 && this.tween2.kill(null, this);
  }

  animateIn = ({ delay = 0, duration = 2 } = {}) => {
    // choose next image
    this.tween = TweenMax.to(this, duration, {
      opacity: 1,
      ease: Power2.easeOut,
      delay,
      onComplete: () => {
        this.animateOut({ delay: 5 });
      },
    });
  };

  animateOut = ({ delay = 5, duration = 0.3 } = {}) => {
    const { currentImageIndex, backgrounds } = this.state;
    const count = backgrounds.length;
    const nextImageIndex =
      currentImageIndex < count - 1 ? currentImageIndex + 1 : 0;

    this.tween2 = TweenMax.to(this.faderRef.current, duration, {
      opacity: 0,
      ease: Power2.easeOut,
      delay,
      onComplete: () => {
        this.setState({
          currentImageIndex: nextImageIndex,
          fadeOutIndex: currentImageIndex,
        });
        this.animateIn({ delay: 3 });
      },
    });
  };

  render() {
    let screens = new Array(12);

    let { backgrounds, currentImageIndex, fadeOutIndex } = this.state;

    // let set = sampleSize(backgrounds, 3);

    return (
      <Center>
        {map(screens, (screen, i) => {
          let bg = backgrounds[i];
          let visible = i === currentImageIndex || i === fadeOutIndex;

          if (!visible) return null;

          return (
            <div
              ref={this.faderRef}
              key={`circle-${i}`}
              {...css({
                position: "absolute",
                width: "90vmin",
                height: "90vmin",
              })}
            >
              <LargeCircle {...blackBg}>
                <Background>
                  <Image sources={bg} />
                </Background>
              </LargeCircle>
            </div>
          );
        })}
      </Center>
    );
  }
}

export default ImageTransitionTemplate;
