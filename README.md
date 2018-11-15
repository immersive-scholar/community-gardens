# Community Gardens

Community Gardens is a generative art experience about food and housing insecurity within the student body at NC State.

- **Data-Driven**: Plant attributes are driven by data collected by [Dr Mary Haskett](https://psychology.chass.ncsu.edu/faculty_staff/mehasket). Read the [report](https://dasa.ncsu.edu/wp-content/uploads/2018/03/NC-State-Food-and-Housing-Insecurity-1.pdf), and then see how [data affects the plants](https://communitygardens.generativeartist.com/data/)

- **Generative**: The gardens are unique every time the garden is created. No one will ever see the same garden twice.

- **Democratized**: The project runs on large, 20' displays as well as your laptop or your phone.

## Installing

## Technologies

The project is all javascript and [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API), meaning it runs on 20' walls in the Hunt Library's [Immersion Theatre](https://www.lib.ncsu.edu/spaces/immersion-theater), on a desktop, or a mobile device.

- [threejs](https://threejs.org/) is for 3D rendering
- [three.bas](https://github.com/zadvorsky/three.bas), a buffer animation system, enables hundreds of individual elements to be animated in an efficient manner
- [react](https://reactjs.org/) for the UI
- [dat.gui](https://github.com/dataarts/dat.gui) for rapid testing of variables
- [detect-gpu](https://www.npmjs.com/package/detect-gpu) to throttle features per device
- [glamorous](https://glamorous.rocks/) for styling the UI
- [gsap](https://greensock.com/gsap) for tweening
- [lodash](https://lodash.com/) for data-parsing utilities
- [react helmet](https://www.npmjs.com/package/react-helmet) for SEO support within a SPA
- [react redux](https://github.com/reduxjs/react-redux) for bindings
- [typography](https://kyleamathews.github.io/typography.js/) for ... typography.

## Credits

Created by [lucastswick](https://generativeartist.com) during a six-week artist residency funded by the [Andrew Mellon Foundation](https://mellon.org/) through the [Immersive Scholar](https://www.immersivescholar.org/) program with [NCSU](https://www.ncsu.edu/).
