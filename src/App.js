import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch, Redirect } from "react-router";
import Helmet from "react-helmet";
import { TypographyStyle, GoogleFont } from "react-typography";

import typography from "util/typography";
import ScrollToTop from "util/scrollToTop";
import Home from "pages/Home";
import NotFound from "pages/NotFound";

import LoadableThreeContainer from "./loadables/LoadableThreeContainer";

class App extends Component {
  componentWillUpdate({ location, history }) {
    const gtag = window.gtag;

    if (location.pathname === this.props.location.pathname) {
      return;
    }

    if (history.action === "PUSH" && typeof gtag === "function") {
      gtag("config", "UA-117743172-2", {
        page_location: window.location.href,
        page_path: location.pathname
      });
    }
  }
  render() {
    return (
      <div className="App">
        <Helmet
          title="Generative Artist lucastswick"
          description="lucastswick is a generative artist writing algorithms that describe natural phenomena."
        />
        <TypographyStyle typography={typography} />
        <GoogleFont typography={typography} />
        <Router basename={process.env.PUBLIC_URL}>
          <div id="outer-container">
            {/* <TopNavContainer /> */}
            <div id="page-wrap">
              <ScrollToTop>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Switch>
                    <Route
                      exact
                      path="/garden"
                      component={LoadableThreeContainer}
                    />
                    <Route
                      path="/garden/:gardenID"
                      component={LoadableThreeContainer}
                    />
                    <Route component={NotFound} />
                  </Switch>
                  <Route component={NotFound} />
                </Switch>
              </ScrollToTop>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
