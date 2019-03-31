import GridTemplate from "../templates/GridTemplate";

class InspirationSlide extends GridTemplate {
  constructor(props) {
    super(props);

    const history = [];
    let i;
    for (i = 1; i <= 3; i++) {
      history.push([
        {
          srcSet: require(`assets/presentation/jared-tarbell-${i}.jpg`),
        },
      ]);
    }
    for (i = 1; i <= 3; i++) {
      history.push([
        {
          srcSet: require(`assets/presentation/inconvergent-${i}.jpg`),
        },
      ]);
    }
    for (i = 1; i <= 3; i++) {
      history.push([
        {
          srcSet: require(`assets/presentation/flight404-${i}.jpg`),
        },
      ]);
    }
    for (i = 1; i <= 3; i++) {
      history.push([
        {
          srcSet: require(`assets/presentation/nervous-${i}.jpg`),
        },
      ]);
    }

    const captions = [
      "Jared Tarbell",
      "",
      "",
      "Anders Hoff",
      "",
      "",
      "Robert Hodgin",
      "",
      "",
      "n-e-r-v-o-u-s",
    ];

    this.state = { backgrounds: history, captions };
  }
}

export default InspirationSlide;

// import React, { PureComponent, Fragment } from "react";
// import map from "lodash/map";
// import { css } from "glamor";

// import Image from "components/atoms/Image";

// import {
//   Circle,
//   Background,
//   Caption,
//   Wrapper,
// } from "pages/Presentation/styles";

// class InspirationSlide extends PureComponent {
//   componentWillMount() {

//   }
//   render() {
//     let screens = new Array(12);
//     const { backgrounds, captions } = this.state;

//     return (
//       <Fragment>
//         {map(screens, (screen, i) => {
//           let bg = backgrounds[i];
//           return (
//             <Wrapper key={`wrapper-${i}`}>
//               <Circle {...css({ background: `#000000 !important` })}>
//                 <Background>
//                   <Image sources={bg} />
//                 </Background>
//               </Circle>
//               {i % 3 === 0 && (
//                 <div {...css({ padding: "4rem" })}>
//                   <Caption>{captions[i / 3]}</Caption>
//                 </div>
//               )}
//             </Wrapper>
//           );
//         })}
//       </Fragment>
//     );
//   }
// }

// export default InspirationSlide;
