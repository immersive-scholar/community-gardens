import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import ThreeContainer from "three/ThreeContainer";
// import Settings from "ui/organisms/settings";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Router basename={process.env.PUBLIC_URL}>{/* <Settings /> */}</Router>
        <ThreeContainer />
      </Fragment>
    );
  }
}

export default App;
